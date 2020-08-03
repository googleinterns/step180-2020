/**
 * @fileoverview Testing utils
 *
 * Override original test functions to create customizations
 * for the project setup, like a custom render with every wrapper
 * needed to get the tests to work.
 */
import PropTypes from 'prop-types';
import {MemoryRouter} from 'react-router-dom';
import {theme} from '../config/theme';
import {ThemeProvider as StyledProvider} from 'styled-components';
import {ThemeProvider, StylesProvider} from '@material-ui/core/styles';
import React from 'react';
import {render} from '@testing-library/react';

/**
 * Setup context needed in every render, so test could pass
 * and also replicate a pretty similiar environment to the
 * one when app is running
 *
 * @param {{children: ReactNode}} params
 *    children is the component to be rendered in tests
 * @return {ReactNode} Enhanced children with providers
 */
const AllTheProviders = ({children}) => {
  return (
    <StylesProvider injectFirst>
      <StyledProvider theme={theme}>
        <ThemeProvider theme={theme}>
          <MemoryRouter>{children}</MemoryRouter>
        </ThemeProvider>
      </StyledProvider>
    </StylesProvider>
  );
};

AllTheProviders.propTypes = {
  children: PropTypes.node.isRequired,
};

/**
 * Replace original render and return an adaptation
 * with context providers to get the tests to work.
 *
 * @param {ReactNode} ui React element to be tested
 * @param {object} options config
 * @return {HTMLNode} rendered component
 */
const customRender = (ui, options) =>
  render(ui, {wrapper: AllTheProviders, ...options});

// re-export everything
export * from '@testing-library/react';

// override render method
export {customRender as render};
