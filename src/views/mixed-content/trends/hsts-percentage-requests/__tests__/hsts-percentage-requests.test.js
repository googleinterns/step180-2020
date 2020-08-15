import React from 'react';
import HSTSPercentageRequests from '../index';
import {render, screen, waitForElementToBeRemoved} from 'test-utils';

beforeEach(() => render(<HSTSPercentageRequests />));

test('Renders main card container correctly', async () => {
  const card = screen.getByTestId('hsts-percentage-requests-card');
  expect(card).toBeInTheDocument();

  // Check that initially renders loader component
  const chartLoader = screen.getByTestId('chart-loader');
  expect(chartLoader).toBeInTheDocument();
});

test('Renders charts after API is called', async () => {
  // After API is called, loaders should disappear
  await waitForElementToBeRemoved(screen.getByTestId('chart-loader'));

  // Also, chart should be rendered by default
  const mixedPercentageChart = screen.getByTestId(
    'hsts-percentage-requests-chart',
  );
  expect(mixedPercentageChart).toBeInTheDocument();
});
