import React from 'react';
import { useRoutes } from 'react-router-dom';

import 'assets/stylesheets/application.scss';

import { UserContextProvider } from 'contexts/UserContext';
import routes from 'routes';

const App = (): JSX.Element => {
  const appRoutes = useRoutes(routes);

  return <UserContextProvider>{appRoutes}</UserContextProvider>;
};

export default App;
