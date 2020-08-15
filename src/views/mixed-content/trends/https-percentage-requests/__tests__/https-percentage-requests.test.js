import React from 'react';
import HTTPSPercentageRequests from '../index';
import {render, waitForElementToBeRemoved, screen} from 'test-utils';

test('Renders main card container correctly', async () => {
  const {getByTestId} = render(<HTTPSPercentageRequests />);
  const card = getByTestId('https-percentage-requests-card');
  expect(card).toBeInTheDocument();

  // Check that initially renders loader component
  const chartLoader = getByTestId('chart-loader');
  expect(chartLoader).toBeInTheDocument();
});

test('Renders charts after API is called', async () => {
  render(<HTTPSPercentageRequests />);

  // After API is called, loaders should disappear
  await waitForElementToBeRemoved(screen.getByTestId('chart-loader'));

  // Also, chart should be rendered by default
  const mixedPercentageChart = screen.getByTestId(
    'https-percentage-requests-chart',
  );
  expect(mixedPercentageChart).toBeInTheDocument();
});
