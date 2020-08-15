import React from 'react';
import TopWebistesWithMixedContent from '../index';
import {render, waitForElementToBeRemoved, screen} from 'test-utils';

test('Renders main card container correctly', async () => {
  const {getByTestId} = render(<TopWebistesWithMixedContent />);
  const card = getByTestId('top-websites-with-mixed-content-card');
  expect(card).toBeInTheDocument();

  // Check that initially renders loader component
  const chartLoader = getByTestId('chart-loader');
  expect(chartLoader).toBeInTheDocument();
});

test('Renders charts after API is called', async () => {
  render(<TopWebistesWithMixedContent />);

  // After API is called, loaders should disappear
  await waitForElementToBeRemoved(screen.getByTestId('chart-loader'));

  // Also, first chart should be rendered by default
  const mixedPercentageChart = screen.getByTestId('mixed-percentage-chart');
  expect(mixedPercentageChart).toBeInTheDocument();
});
