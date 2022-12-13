import { createRouteView, Link } from 'atomic-router-react';

import { SignUpForm } from '@lm-client/features/auth';
import { Heading } from '@lm-client/shared/ui';
import { routes } from '@lm-client/shared/routes';

export const SignUpPage = createRouteView({
  route: routes.signUp,
  view() {
    return (
      <>
        <Heading size="xl" className="mb-60 text-center">
          Sign Up
        </Heading>
        <SignUpForm />
        <Link to={routes.signIn} className="text-14 text-blue hover:underline">
          Already have an account? Sign in
        </Link>
      </>
    );
  },
});
