import React from 'react';
import MainLayout from './layouts/main';
import {theme} from './config/theme';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import {ThemeProvider as StyledProvider} from 'styled-components';
import {ThemeProvider, StylesProvider} from '@material-ui/core/styles';
import About from './views/about';
import MixedContent from './views/mixed-content';

const App = () => {
  return (
    <>
      <CssBaseline />
      <StylesProvider injectFirst>
        <StyledProvider theme={theme}>
          <ThemeProvider theme={theme}>
            <Router>
              <MainLayout>
                <Switch>
                  <Route path="/about" component={About}/>
                  <Route path="/mixed-content" component={MixedContent}/>
                  <Redirect to="/about" />
                </Switch>
              </MainLayout>
            </Router>
          </ThemeProvider>
        </StyledProvider>
      </StylesProvider>
    </>
  );
};

export default App;
