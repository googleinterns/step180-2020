import App from '../App';
import React from 'react';
import {render, fireEvent} from 'test-utils';

test('Routing is working', () => {
  const {getByTestId} = render(<App />);

  // App will start at /
  // This tests the redirect to /about and also
  // that /about route is working
  const aboutMessage = getByTestId('about');
  expect(aboutMessage).toBeInTheDocument();

  // Change route to /mixed-content
  fireEvent.click(getByTestId('mixed-content-navigation-button'));

  // Ensure new elements are there
  const mixedContentMessage = getByTestId('mixed-content');
  expect(mixedContentMessage).toBeInTheDocument();
});
