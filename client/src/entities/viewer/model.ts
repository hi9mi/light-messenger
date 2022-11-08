import { createStore } from 'effector';
import * as internal from '@lm-client/shared/api/internal';

const $viewer = createStore<null | internal.UserGetDone['answer']>(null);
const $isAuthenticated = $viewer.map((v) => !!v);
