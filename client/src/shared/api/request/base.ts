import { attach, createEffect, createEvent, createStore } from 'effector';

export interface Request {
  path: string;
  method: 'POST' | 'GET' | 'DELETE' | 'PUT' | 'PATCH';
  body?: Record<string, unknown> | null | void;
  query?: Record<string, string>;
  headers?: Record<string, string>;
  cookies?: string;
}

export interface Answer {
  ok: boolean;
  body: unknown;
  status: number;
  headers: Record<string, string>;
}

export const sendRequestFx = createEffect<Request, Answer>(async (params) => {
  const res = await fetch(params.path + params.query, {
    body: JSON.stringify(params.body),
    headers: params.headers,
  });
  const data = await res.json();
  return data;
});
