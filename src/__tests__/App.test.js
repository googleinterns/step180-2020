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

  // Change route to /mixed-content/worldwide
  fireEvent.click(getByTestId('mixed-content-worldwide-navigation-button'));

  // Since /mixed-content is only a router, there is no actual elements
  // under that route but the main redirect could be tested, which by
  // default renders /worldwide
  const mixedContentContainerDefaultRedirect = getByTestId(
      'mixed-content-worldwide',
  );
  expect(mixedContentContainerDefaultRedirect).toBeInTheDocument();
});
