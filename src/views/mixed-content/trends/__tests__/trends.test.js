import Trends from '../index';
import React from 'react';
import {render} from 'test-utils';

test('Renders /mixed-content/trends correctly', () => {
  const {getByTestId} = render(<Trends />);
  const trendsContainer = getByTestId('mixed-content-trends');
  expect(trendsContainer).toBeInTheDocument();
});
