import About from './views/about';
import CssBaseline from '@material-ui/core/CssBaseline';
import MainLayout from './layouts/main';
import MixedContent from './views/mixed-content';
import React from 'react';
import Tls from './views/tls';
import {Redirect, Route, Switch} from 'react-router-dom';

/**
 * App Component
 *
 * Handle global setup to wrap routes.
 * Also, it uses the following components and wrappers:
 *
 * CssBaseline: is the css reset provided by material-ui
 * MainLayout: Is the layout wrapper, with the navbar and sidebar
 * Switch: It renders the provided component based on the path
 *
 * @return {ReactNode} App component
 */
const App = () => {
  return (
    <>
      <CssBaseline />
      <MainLayout>
        <Switch>
          <Route path="/about" component={About} />
          <Route path="/mixed-content" component={MixedContent} />
          <Route path="/tls" component={Tls} />
          <Redirect to="/about" />
        </Switch>
      </MainLayout>
    </>
  );
};

export default App;
