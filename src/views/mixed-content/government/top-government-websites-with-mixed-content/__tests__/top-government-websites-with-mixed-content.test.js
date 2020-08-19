import React from 'react';
import TopGovernmentWebsitesWithMixedContent from '../index';
import {render, screen, waitForElementToBeRemoved} from 'test-utils';

beforeEach(() => render(<TopGovernmentWebsitesWithMixedContent />));

test('Renders main card container correctly', async () => {
  const card = screen.getByTestId(
    'top-government-websites-with-mixed-content-card',
  );
  expect(card).toBeInTheDocument();

  // Check that initially renders loader component
  const chartLoader = screen.getByTestId('chart-loader');
  expect(chartLoader).toBeInTheDocument();
});

test('Renders charts after API is called', async () => {
  // After API is called, loaders should disappear
  await waitForElementToBeRemoved(() => screen.getByTestId('chart-loader'));

  // Also, chart should be rendered by default
  const mixedPercentageChart = screen.getByTestId(
    'top-government-websites-with-mixed-content-chart',
  );
  expect(mixedPercentageChart).toBeInTheDocument();
});

test('Renders table after API is called', async () => {
  // After API is called, skeletons should disappear
  await waitForElementToBeRemoved(() => screen.getByTestId('table-skeletons'));

  // Also, first table should be rendered by default
  const mixedContentTable = screen.getByTestId(
    'mixed-content-government-sites-table',
  );
  expect(mixedContentTable).toBeInTheDocument();
});
