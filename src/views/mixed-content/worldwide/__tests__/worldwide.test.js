import Worldwide from '../index';
import React from 'react';
import {render} from 'test-utils';

test('Renders /mixed-content/worldwide correctly', () => {
  const {getByTestId} = render(<Worldwide />);
  const worldwideContainer = getByTestId('mixed-content-worldwide');
  expect(worldwideContainer).toBeInTheDocument();
});
