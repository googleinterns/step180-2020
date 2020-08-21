import HTTPSPercentagePages from '../index';
import React from 'react';
import {render, screen, waitForElementToBeRemoved} from 'test-utils';

beforeEach(() => render(<HTTPSPercentagePages />));

test('Renders main card container correctly', async () => {
  const card = screen.getByTestId('https-percentage-pages-card');
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
    'https-percentage-pages-chart',
  );
  expect(mixedPercentageChart).toBeInTheDocument();
});
