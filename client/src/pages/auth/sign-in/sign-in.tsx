import { Link } from 'atomic-router-react';
import { AuthLayout, Heading } from '@lm-client/shared/ui';
import { SignInForm } from '@lm-client/features/auth/sign-in-form';
import { routes } from '@lm-client/shared/routes';

export const SignIn = () => {
  return (
    <AuthLayout>
      <Heading size="xl" className="mb-60 text-center">
        Sign In
      </Heading>
      <SignInForm />
      <Link to={routes.signUp} className="text-14 text-blue hover:underline">
        Don't have an account yet? Sign up
      </Link>
    </AuthLayout>
  );
};
