import MainLayout from '../index';
import React from 'react';
import {render, fireEvent} from 'test-utils';

test('Route buttons are shown', () => {
  const {getByTestId} = render(<MainLayout>Test Children</MainLayout>);

  // If you're adding a new route, add the appropiate data-testid
  // and list it here
  const aboutNavButton = getByTestId('about-navigation-button');
  const mixedContentWorlwideNavButton = getByTestId(
      'mixed-content-worldwide-navigation-button',
  );
  const mixedContentTrendsNavButton = getByTestId(
      'mixed-content-trends-navigation-button',
  );
  const mixedContentGovernmentNavButton = getByTestId(
      'mixed-content-government-navigation-button',
  );

  expect(aboutNavButton).toBeInTheDocument();
  expect(mixedContentWorlwideNavButton).toBeInTheDocument();
  expect(mixedContentTrendsNavButton).toBeInTheDocument();
  expect(mixedContentGovernmentNavButton).toBeInTheDocument();
});

test('Route buttons are active on their corresponding routes', () => {
  const {getByTestId} = render(<MainLayout>Test Children</MainLayout>);

  // If you're adding a new route, add the appropiate data-testid
  // and list it here
  const aboutNavButton = getByTestId('about-navigation-button');
  const mixedContentWorlwideNavButton = getByTestId(
      'mixed-content-worldwide-navigation-button',
  );
  const mixedContentTrendsNavButton = getByTestId(
      'mixed-content-trends-navigation-button',
  );
  const mixedContentGovernmentNavButton = getByTestId(
      'mixed-content-government-navigation-button',
  );

  // Since app starts at / is needed to redirect to /about
  // the first route should be active, so this line is only for
  // formalizing navigation
  fireEvent.click(aboutNavButton);

  expect(aboutNavButton).toHaveAttribute('active', 'true');
  expect(mixedContentWorlwideNavButton).toHaveAttribute('active', '');
  expect(mixedContentTrendsNavButton).toHaveAttribute('active', '');
  expect(mixedContentGovernmentNavButton).toHaveAttribute('active', '');

  // Change route to /mixed-content/worldwide
  fireEvent.click(mixedContentWorlwideNavButton);

  expect(aboutNavButton).toHaveAttribute('active', '');
  expect(mixedContentWorlwideNavButton).toHaveAttribute('active', 'true');
  expect(mixedContentTrendsNavButton).toHaveAttribute('active', '');
  expect(mixedContentGovernmentNavButton).toHaveAttribute('active', '');

  // Change route to /mixed-content/trends
  fireEvent.click(mixedContentTrendsNavButton);

  expect(aboutNavButton).toHaveAttribute('active', '');
  expect(mixedContentWorlwideNavButton).toHaveAttribute('active', '');
  expect(mixedContentTrendsNavButton).toHaveAttribute('active', 'true');
  expect(mixedContentGovernmentNavButton).toHaveAttribute('active', '');

  // Change route to /mixed-content/trends
  fireEvent.click(mixedContentGovernmentNavButton);

  expect(aboutNavButton).toHaveAttribute('active', '');
  expect(mixedContentWorlwideNavButton).toHaveAttribute('active', '');
  expect(mixedContentTrendsNavButton).toHaveAttribute('active', '');
  expect(mixedContentGovernmentNavButton).toHaveAttribute('active', 'true');
});

test('Drawer opens and closes correctly', () => {
  const {getByTestId} = render(<MainLayout>Test Children</MainLayout>);

  const drawer = getByTestId('navigation-drawer');
  const appbar = getByTestId('appbar');
  const toggleDrawerButton = getByTestId('toggle-drawer-button');

  // By default drawer is open

  // Close drawer
  fireEvent.click(toggleDrawerButton);
  expect(window.getComputedStyle(drawer).width).toBe('72px');
  expect(appbar).not.toHaveAttribute('open');

  // Open drawer
  fireEvent.click(toggleDrawerButton);
  expect(window.getComputedStyle(drawer).width).toBe('240px');
  expect(appbar).toHaveAttribute('open');
});

test('Mixed Content tab opens and closes correctly', () => {
  const {getByTestId} = render(<MainLayout>Test Children</MainLayout>);

  const collapse = getByTestId('mixed-content-collapse');
  const mixedContentTabButton = getByTestId('mixed-content-tab-button');

  // By default collapse is open

  // Close collapse
  fireEvent.click(mixedContentTabButton);
  expect(collapse).toHaveAttribute('is-open-for-testing', 'false');

  // Open collapse
  fireEvent.click(mixedContentTabButton);
  expect(collapse).toHaveAttribute('is-open-for-testing', 'true');
});
