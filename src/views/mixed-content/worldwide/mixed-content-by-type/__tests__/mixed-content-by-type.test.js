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
  const card = screen.getByTestId('mixed-content-by-type-card');
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
    'mixed-content-by-type-chart',
  );
  expect(mixedPercentageChart).toBeInTheDocument();
});

test('Changes between tabs and shows different charts', async () => {
  // After API is called, loaders should disappear
  await waitForElementToBeRemoved(() => screen.getByTestId('chart-loader'));

  // Change to all types tab
  act(() => {
    fireEvent.click(screen.getByTestId('all-tab'));
  });
  await waitFor(() =>
    expect(
      screen.getByTestId('mixed-content-by-type-chart'),
    ).toBeInTheDocument(),
  );

  // Change to image types tab
  act(() => {
    fireEvent.click(screen.getByTestId('image-tab'));
  });
  await waitFor(() =>
    expect(
      screen.getByTestId('mixed-content-by-type-chart'),
    ).toBeInTheDocument(),
  );

  // Change to font types tab
  act(() => {
    fireEvent.click(screen.getByTestId('font-tab'));
  });
  await waitFor(() =>
    expect(
      screen.getByTestId('mixed-content-by-type-chart'),
    ).toBeInTheDocument(),
  );

  // Change to text types tab
  act(() => {
    fireEvent.click(screen.getByTestId('text-tab'));
  });
  await waitFor(() =>
    expect(
      screen.getByTestId('mixed-content-by-type-chart'),
    ).toBeInTheDocument(),
  );

  // Change to application types tab
  act(() => {
    fireEvent.click(screen.getByTestId('application-tab'));
  });
  await waitFor(() =>
    expect(
      screen.getByTestId('mixed-content-by-type-chart'),
    ).toBeInTheDocument(),
  );
});
