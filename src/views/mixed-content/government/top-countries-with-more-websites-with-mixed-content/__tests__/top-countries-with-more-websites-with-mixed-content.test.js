import React from 'react';
import TopCountriesWithMoreWebsitesWithMixedContent from '../index';
import {render, waitForElementToBeRemoved, screen} from 'test-utils';

test('Renders main card container correctly', async () => {
  const {getByTestId} = render(
    <TopCountriesWithMoreWebsitesWithMixedContent />,
  );
  const card = getByTestId(
    'top-countries-with-more-websites-more-government-with-mixed-content-card',
  );
  expect(card).toBeInTheDocument();

  // Check that initially renders loader component
  const chartLoader = getByTestId('chart-loader');
  expect(chartLoader).toBeInTheDocument();
});

test('Renders charts after API is called', async () => {
  render(<TopCountriesWithMoreWebsitesWithMixedContent />);

  // After API is called, loaders should disappear
  await waitForElementToBeRemoved(screen.getByTestId('chart-loader'));

  // Also, chart should be rendered by default
  const mixedPercentageChart = screen.getByTestId(
    'top-countries-with-more-websites-more-government-with-mixed-content-chart',
  );
  expect(mixedPercentageChart).toBeInTheDocument();
});
