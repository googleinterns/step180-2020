/**
 * @fileoverview React entry point
 *
 * This file is used as the entry point for every component
 * wrote inside src. It is bundled via webpack and used in
 * /public/index.html to render the app.
 */
import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import {theme} from './config/theme';
import {ThemeProvider as StyledProvider} from 'styled-components';
import {ThemeProvider, StylesProvider} from '@material-ui/core/styles';

/**
 * Entry point
 *
 * The app to be rendered needs the following providers to work:
 *
 * StylesProvider: it provides suppor for styled-components
 * StyledProvider: it provides context to access theme variables
 *    via styled components declaration. It allows to access props.theme
 *    within elements.js files.
 * ThemeProvider: it provides theme for Material UI native components
 * Router: It handles Single Page Application Routing
 */
ReactDOM.render(
    <React.StrictMode>
      <StylesProvider injectFirst>
        <StyledProvider theme={theme}>
          <ThemeProvider theme={theme}>
            <Router>
              <App />
            </Router>
          </ThemeProvider>
        </StyledProvider>
      </StylesProvider>
    </React.StrictMode>,
    document.getElementById('root'),
);
