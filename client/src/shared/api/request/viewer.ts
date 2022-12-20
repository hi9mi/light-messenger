import { createEffect } from 'effector';
import type { ApiError, User } from '@lm-client/shared/types';
import { handledRequestFx } from './base';

export const getViewerFx = createEffect<void, User, ApiError>(
  () =>
    handledRequestFx({
      path: new URL('user/me', import.meta.env.VITE_BASE_API_URL).toString(),
      method: 'GET',
    }) as Promise<User>
);
