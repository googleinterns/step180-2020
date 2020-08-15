import App from '../App';
import React from 'react';
import {act, fireEvent, render, screen} from 'test-utils';

test('Routing is working', async () => {
  render(<App />);
  // App will start at /
  // This tests the redirect to /about and also
  // that /about route is working
  const aboutMessage = screen.getByTestId('about');
  expect(aboutMessage).toBeInTheDocument();

  // Change route to /mixed-content/worldwide
  fireEvent.click(
      screen.getByTestId('mixed-content-worldwide-navigation-button'),
  );

  // Since /mixed-content is only a router, there is no actual elements
  // under that route but the main redirect could be tested, which by
  // default renders /worldwide
  const mixedContentWorlwide = screen.getByTestId('mixed-content-worldwide');
  expect(mixedContentWorlwide).toBeInTheDocument();

  // Change route to /mixed-content/trends
  fireEvent.click(screen.getByTestId('mixed-content-trends-navigation-button'));

  const mixedContentTrends = screen.getByTestId('mixed-content-trends');
  expect(mixedContentTrends).toBeInTheDocument();

  // Change route to /mixed-content/government
  fireEvent.click(
      screen.getByTestId('mixed-content-government-navigation-button'),
  );

  const mixedContentGovernment = screen.getByTestId('mixed-content-government');
  expect(mixedContentGovernment).toBeInTheDocument();
});
