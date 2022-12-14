import { createRouteView, Link } from 'atomic-router-react';
import { Heading } from '@lm-client/shared/ui';
import { chainAuthorized, routes } from '@lm-client/shared/routes';

export const authorizedHome = chainAuthorized(routes.home);

export const HomePage = createRouteView({
  route: authorizedHome,
  view() {
    return (
      <>
        <Heading size="xl" className="mb-60 text-center">
          Home
        </Heading>
        Home page
        <Link to={routes.signIn} className="text-14 text-blue hover:underline">
          Auth page
        </Link>
      </>
    );
  },
  otherwise() {
    return <div>Loading...</div>;
  },
});
