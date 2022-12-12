import { createEvent, createStore, sample } from 'effector';
import { reset } from 'patronum/reset';
import * as api from '@lm-client/shared/api';
import type { User } from '@lm-client/shared/types';

export const $viewer = createStore<User | null>(null);
export const $isAuthenticated = $viewer.map((v) => !!v);

export const viewerLoggedIn = createEvent<User>();

sample({
  clock: viewerLoggedIn,
  target: $viewer,
});

reset({
  clock: api.logoutFx.doneData,
  target: api.$token,
});
