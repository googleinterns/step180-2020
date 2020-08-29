import MixedContentByType from '../index';
import React from 'react';
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from 'test-utils';

beforeEach(() => render(<MixedContentByType />));

test('Renders main card container correctly', async () => {
  const card = screen.getByTestId('certificate-authority-card');
  expect(card).toBeInTheDocument();

  // Check that initially renders loader component
  const chartLoader = screen.getByTestId('chart-loader');
  expect(chartLoader).toBeInTheDocument();
});

test('Renders charts after API is called', async () => {
  // After API is called, loaders should disappear
  await waitForElementToBeRemoved(() => screen.getByTestId('chart-loader'));

  // Also, first chart should be rendered by default
  const mixedPercentageChart = screen.getByTestId(
    'certificate-authority-chart',
  );
  expect(mixedPercentageChart).toBeInTheDocument();
});

test('Changes between tabs and shows different charts', async () => {
  // After API is called, loaders should disappear
  await waitForElementToBeRemoved(() => screen.getByTestId('chart-loader'));

  // Change to sample types tab
  act(() => {
    fireEvent.click(screen.getByTestId('sample-tab'));
  });
  await waitFor(() =>
    expect(
      screen.getByTestId('certificate-authority-chart'),
    ).toBeInTheDocument(),
  );

  // Change to 2018 tab
  act(() => {
    fireEvent.click(screen.getByTestId('2018'));
  });
  await waitFor(() =>
    expect(
      screen.getByTestId('certificate-authority-chart'),
    ).toBeInTheDocument(),
  );

  // Change to 2019 tab
  act(() => {
    fireEvent.click(screen.getByTestId('2019'));
  });
  await waitFor(() =>
    expect(
      screen.getByTestId('certificate-authority-chart'),
    ).toBeInTheDocument(),
  );

  // Change to 2020 tab
  act(() => {
    fireEvent.click(screen.getByTestId('2020'));
  });
  await waitFor(() =>
    expect(
      screen.getByTestId('certificate-authority-chart'),
    ).toBeInTheDocument(),
  );
});
