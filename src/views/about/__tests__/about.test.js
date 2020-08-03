import About from '../index';
import React from 'react';
import {render} from 'test-utils';

test('renders About', () => {
  const {getByTestId} = render(<About />);
  const linkElement = getByTestId('about');
  expect(linkElement).toBeInTheDocument();
});
