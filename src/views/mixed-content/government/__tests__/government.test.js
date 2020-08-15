import Government from '../index';
import React from 'react';
import {render} from 'test-utils';

test('Renders /mixed-content/government correctly', () => {
  const {getByTestId} = render(<Government />);
  const governmentContainer = getByTestId('mixed-content-government');
  expect(governmentContainer).toBeInTheDocument();
});
