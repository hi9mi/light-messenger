import { createRoutesView } from 'atomic-router-react';
import { routes } from '@lm-client/shared/routes';
import { SignInPage, SignUpPage } from './auth';
import { AuthLayout } from '@lm-client/shared/ui';

export const Pages = createRoutesView({
  routes: [
    { route: routes.signIn, view: SignInPage, layout: AuthLayout },
    { route: routes.signUp, view: SignUpPage, layout: AuthLayout },
    { route: routes.home, view: () => <div>HomePage</div> },
  ],
});

export const routesMap = [
  {
    path: '/',
    route: routes.home,
  },
  {
    path: '/auth/sign-up',
    route: routes.signUp,
  },
  {
    path: '/auth/sign-in',
    route: routes.signIn,
  },
];
