import { createEffect } from 'effector';
import { handledRequestFx } from './base';
import type { ApiError, User } from '@lm-client/shared/types';

export const signUpFx = createEffect<
  { username: string; password: string; phoneNumber: string; email: string },
  { user: User; token: string },
  ApiError
>(
  (signUpPayload) =>
    handledRequestFx({
      path: new URL(
        'auth/local/sign-up',
        import.meta.env.VITE_BASE_API_URL
      ).toString(),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: signUpPayload,
    }) as Promise<{ user: User; token: string }>
);

export const signInFx = createEffect<
  { email: string; password: string },
  { user: User; token: string },
  ApiError
>(
  (signInPayload) =>
    handledRequestFx({
      path: new URL(
        'auth/local/sign-in',
        import.meta.env.VITE_BASE_API_URL
      ).toString(),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: signInPayload,
    }) as Promise<{ user: User; token: string }>
);

export const logoutFx = createEffect<void, { message: string }, ApiError>(
  () =>
    handledRequestFx({
      path: new URL(
        'auth/local/logout',
        import.meta.env.VITE_BASE_API_URL
      ).toString(),
      method: 'POST',
    }) as Promise<{ message: string }>
);
