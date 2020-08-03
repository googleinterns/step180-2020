import MixedContent from '../index';
import React from 'react';
import {render} from 'test-utils';

test('renders MixedContent', () => {
  const {getByTestId} = render(<MixedContent />);
  const linkElement = getByTestId('mixed-content');
  expect(linkElement).toBeInTheDocument();
});
