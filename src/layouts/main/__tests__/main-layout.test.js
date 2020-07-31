import MainLayout from '../index';
import React from 'react';
import {render, fireEvent} from 'test-utils';

test('Route buttons are shown', () => {
  const {getByTestId} = render(<MainLayout>Test Children</MainLayout>);

  // If you're adding a new route, add the appropiate data-testid
  // and list it here
  const aboutNavButton = getByTestId('about-navigation-button');
  const mixedContentNavButton = getByTestId('mixed-content-navigation-button');

  expect(aboutNavButton).toBeInTheDocument();
  expect(mixedContentNavButton).toBeInTheDocument();
});

test('Route buttons are active on their corresponding routes', () => {
  const {getByTestId} = render(<MainLayout>Test Children</MainLayout>);

  // If you're adding a new route, add the appropiate data-testid
  // and list it here
  const aboutNavButton = getByTestId('about-navigation-button');
  const mixedContentNavButton = getByTestId('mixed-content-navigation-button');

  // Since app starts at / we need to redirect to /about
  // Change route to /mixed-content
  fireEvent.click(aboutNavButton);

  expect(aboutNavButton).toHaveAttribute('active', 'true');
  expect(mixedContentNavButton).toHaveAttribute('active', '');

  // Change route to /mixed-content
  fireEvent.click(mixedContentNavButton);

  // Since app starts at / and redirects to /about,
  // the first route should be active
  expect(aboutNavButton).toHaveAttribute('active', '');
  expect(mixedContentNavButton).toHaveAttribute('active', 'true');
});

test('Drawer opens and closes', () => {
  const {getByTestId} = render(<MainLayout>Test Children</MainLayout>);

  const drawer = getByTestId('navigation-drawer');
  const appbar = getByTestId('appbar');
  const toggleDrawerButton = getByTestId('toggle-drawer-button');

  // Open drawer
  fireEvent.click(toggleDrawerButton);
  expect(window.getComputedStyle(drawer).width).toBe('240px');
  expect(appbar).toHaveAttribute('open');

  // Close drawer
  fireEvent.click(toggleDrawerButton);
  expect(window.getComputedStyle(drawer).width).toBe('73px');
  expect(appbar).not.toHaveAttribute('open');
});
