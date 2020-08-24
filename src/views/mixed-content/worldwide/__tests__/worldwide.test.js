import React from 'react';
import {render} from 'test-utils';
import Worldwide from '../index';

test('Renders /mixed-content/worldwide correctly', () => {
  const {getByTestId} = render(<Worldwide />);
  const worldwideContainer = getByTestId('mixed-content-worldwide');
  expect(worldwideContainer).toBeInTheDocument();
});
