import React from 'react';
import MainLayout from './layouts/main';
import {theme} from './config/theme';
import CssBaseline from '@material-ui/core/CssBaseline';
import {
  ThemeProvider as StyledComponentsThemeProvider,
} from 'styled-components';
import {ThemeProvider, StylesProvider} from '@material-ui/core/styles';

const App = () => {
  return (
    <>
      <CssBaseline />
      <StylesProvider injectFirst>
        <StyledComponentsThemeProvider theme={theme}>
          <ThemeProvider theme={theme}>
            <MainLayout>

            </MainLayout>
          </ThemeProvider>
        </StyledComponentsThemeProvider>
      </StylesProvider>
    </>
  );
};

export default App;
