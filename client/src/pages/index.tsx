import { Route } from 'atomic-router-react';
import { routes } from '@lm-client/shared/routes';
import { SignIn, SignUp } from './auth';

export const Pages = () => {
  return (
    <>
      <Route route={routes.signUp} view={SignUp} />
      <Route route={routes.signIn} view={SignIn} />
    </>
  );
};

export const routesMap = [
  {
    path: '/auth/sign-up',
    route: routes.signUp,
  },
  {
    path: '/auth/sign-in',
    route: routes.signIn,
  },
];
