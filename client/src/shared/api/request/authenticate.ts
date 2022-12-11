import { createEffect } from 'effector';
import { handledRequestFx } from './base';

export const signUpFx = createEffect<
  { username: string; password: string; phoneNumber: string; email: string },
  unknown
>((signUpPayload) =>
  handledRequestFx({
    path: new URL(
      'auth/local/sign-up',
      import.meta.env.VITE_BASE_API_URL
    ).toString(),
    method: 'POST',
    body: signUpPayload,
  })
);

export const signInFx = createEffect<
  { email: string; password: string },
  unknown
>((signInPayload) =>
  handledRequestFx({
    path: new URL(
      'auth/local/sign-in',
      import.meta.env.VITE_BASE_API_URL
    ).toString(),
    method: 'POST',
    body: signInPayload,
  })
);

export const logoutFx = createEffect<void, unknown>(() =>
  handledRequestFx({
    path: new URL(
      'auth/local/logout',
      import.meta.env.VITE_BASE_API_URL
    ).toString(),
    method: 'POST',
  })
);
