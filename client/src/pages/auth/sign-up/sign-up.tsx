import { Link } from 'atomic-router-react';

import { SignUpForm } from '@lm-client/features/auth';
import { AuthLayout, Heading } from '@lm-client/shared/ui';
import { routes } from '@lm-client/shared/routes';

export const SignUp = () => {
  return (
    <AuthLayout>
      <Heading size="xl" className="mb-60 text-center">
        Sign Up
      </Heading>
      <SignUpForm />
      <Link to={routes.signIn} className="text-14 text-blue hover:underline">
        Already have an account? Sign in
      </Link>
    </AuthLayout>
  );
};
