import './index.css';

import { createGate, useGate } from 'effector-react';
import { createHistoryRouter } from 'atomic-router';
import { createBrowserHistory } from 'history';
import { RouterProvider } from 'atomic-router-react';
import { Pages, routesMap } from '@lm-client/pages';

const router = createHistoryRouter({
  routes: routesMap,
});
const history = createBrowserHistory();

router.setHistory(history);

const AppGate = createGate('App');

AppGate.open.watch(() => console.log('app mounted'));

export const App = () => {
  useGate(AppGate);

  return (
    <RouterProvider router={router}>
      <Pages />
    </RouterProvider>
  );
};
