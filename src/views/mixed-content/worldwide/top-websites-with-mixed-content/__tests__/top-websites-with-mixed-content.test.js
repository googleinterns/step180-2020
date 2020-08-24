import React from 'react';
import TopWebsitesWithMixedContent from '../index';
import {
  fireEvent,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from 'test-utils';

beforeEach(() => render(<TopWebsitesWithMixedContent />));

test('Renders main card container correctly', async () => {
  const card = screen.getByTestId('top-websites-with-mixed-content-card');
  expect(card).toBeInTheDocument();

  // Check that initially renders loader component
  const chartLoader = screen.getByTestId('chart-loader');
  expect(chartLoader).toBeInTheDocument();
});

test('Renders charts after API is called', async () => {
  // After API is called, loaders should disappear
  await waitForElementToBeRemoved(() => screen.getByTestId('chart-loader'));

  // Also, first chart should be rendered by default
  const mixedPercentageChart = screen.getByTestId('mixed-percentage-chart');
  expect(mixedPercentageChart).toBeInTheDocument();
});

test('Renders table after API is called', async () => {
  // After API is called, skeletons should disappear
  await waitForElementToBeRemoved(() => screen.getByTestId('table-skeletons'));

  // Also, first table should be rendered by default
  const mixedContentTable = screen.getByTestId('mixed-content-sites-table');
  expect(mixedContentTable).toBeInTheDocument();
});

test('Changes between tabs and shows different charts', async () => {
  // After API is called, loaders should disappear
  await waitForElementToBeRemoved(() => screen.getByTestId('chart-loader'));

  // Change to total resources table
  fireEvent.click(screen.getByTestId('total-tab'));
  await waitFor(() =>
    expect(screen.getByTestId('mixed-reqs-total-chart')).toBeInTheDocument(),
  );

  // Change to total resources table
  fireEvent.click(screen.getByTestId('percentage-tab'));
  await waitFor(() =>
    expect(screen.getByTestId('mixed-percentage-chart')).toBeInTheDocument(),
  );
});
