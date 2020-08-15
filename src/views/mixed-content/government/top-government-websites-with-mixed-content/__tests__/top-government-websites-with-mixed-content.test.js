import React from 'react';
import TopGovernmentWebsitesWithMixedContent from '../index';
import {render, waitForElementToBeRemoved, screen} from 'test-utils';

test('Renders main card container correctly', async () => {
  const {getByTestId} = render(<TopGovernmentWebsitesWithMixedContent />);
  const card = getByTestId('top-government-websites-with-mixed-content-card');
  expect(card).toBeInTheDocument();

  // Check that initially renders loader component
  const chartLoader = getByTestId('chart-loader');
  expect(chartLoader).toBeInTheDocument();
});

test('Renders charts after API is called', async () => {
  render(<TopGovernmentWebsitesWithMixedContent />);

  // After API is called, loaders should disappear
  await waitForElementToBeRemoved(screen.getByTestId('chart-loader'));

  // Also, chart should be rendered by default
  const mixedPercentageChart = screen.getByTestId(
    'top-government-websites-with-mixed-content-chart',
  );
  expect(mixedPercentageChart).toBeInTheDocument();
});
