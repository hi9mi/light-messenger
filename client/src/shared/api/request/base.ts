import { attach, createEffect, createStore, sample } from 'effector';
import { persist } from 'effector-storage/local';
import type { ApiError } from '@lm-client/shared/types';
export interface Request {
  path: string;
  method: 'POST' | 'GET' | 'DELETE' | 'PUT' | 'PATCH';
  body?: Record<string, unknown> | null | void;
  query?: Record<string, string>;
  headers?: Record<string, string>;
}

export const $token = createStore('');

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isApiError = (err: any): err is ApiError => {
  return err.statusCode !== undefined;
};

const baseRequestFx = createEffect<Request, unknown>(
  async ({ path, method, headers, body }) => {
    const res = await fetch(path, {
      method,
      headers,
      ...(Boolean(body) && { body: JSON.stringify(body) }),
    });

    if (!res.ok) {
      const error = (await res.json()) as ApiError;

      if (error.statusCode) {
        throw error;
      }
      throw Error(String(res.status));
    }

    return res.json();
  }
);

const authenticateRequestFx = attach({
  source: $token,
  async effect(token, { path, method, headers, body }) {
    return await baseRequestFx({
      path,
      method,
      headers: { ...headers, Authorization: `Bearer ${token}` },
      body,
    });
  },
});

const updateTokenFx = createEffect<void, { token: string }>(async () => {
  const path = new URL(
    'auth/local/refresh',
    import.meta.env.VITE_BASE_API_URL
  ).toString();

  const res = await fetch(path, {
    method: 'POST',
    credentials: 'include',
  });

  return res.json();
});

export const handledRequestFx = createEffect<
  Request & { tries?: number },
  unknown
>(async ({ path, method, headers, body, tries = 5 }) => {
  try {
    return await authenticateRequestFx({
      path,
      method,
      headers,
      body,
    });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes('401') && tries > 0) {
        await updateTokenFx();
        await handledRequestFx({
          path,
          method,
          headers,
          body,
          tries: tries - 1,
        });
      } else {
        throw error;
      }
    } else if (isApiError(error)) {
      if (error.statusCode === 401 && tries > 0) {
        await updateTokenFx();
        await handledRequestFx({
          path,
          method,
          headers,
          body,
          tries: tries - 1,
        });
      } else {
        throw error;
      }
    } else {
      throw error;
    }
  }
});

sample({
  clock: updateTokenFx.doneData,
  fn: (response) => response.token,
  target: $token,
});

persist({
  store: $token,
  key: 'token',
});
