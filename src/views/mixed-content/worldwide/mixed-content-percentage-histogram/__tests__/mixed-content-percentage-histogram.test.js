import MixedContentPercentageHistogram from '../index';
import React from 'react';
import {render, screen, waitForElementToBeRemoved} from 'test-utils';

beforeEach(() => render(<MixedContentPercentageHistogram />));

test('Renders main card container correctly', async () => {
  const card = screen.getByTestId('mixed-content-percentage-card');
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
    'mixed-content-percentage-chart',
  );
  expect(mixedPercentageChart).toBeInTheDocument();
});
