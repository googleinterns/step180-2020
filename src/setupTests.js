// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';
import dataArrayMockLength from 'config/test';
import faker from 'faker';
import {rest} from 'msw';
import {setupServer} from 'msw/node';

// Auto-mock YellowBox component.

const mockConsoleMethod = (realConsoleMethod) => {
  // These messages are warnings with no solution known
  // explanation about it below:
  const ignoredMessages = [
    // There is no way to do act(...) for subcomponents. When testing routing,
    // it is imposible to wait inner effects
    'test was not wrapped in act(...)',
    // There is no way to cancel an api call without external dependencies,
    // its preferred to keep navigation simple and ignore warnings like this
    // since they're only present during testing
    'perform a React state update on an unmounted component.',
    // This is a deprecation warning from @nivo packages. We should wait 'till
    // they remove it, otherwise, tolerate the warning
    'React.createFactory()',
  ];

  return (message, ...args) => {
    const containsIgnoredMessage = ignoredMessages.some((ignoredMessage) =>
      message.includes(ignoredMessage),
    );

    if (!containsIgnoredMessage) {
      realConsoleMethod(message, ...args);
    }
  };
};

// Suppress console errors and warnings to avoid polluting output in tests.
console.warn = jest.fn(mockConsoleMethod(console.warn));
console.error = jest.fn(mockConsoleMethod(console.error));

const server = setupServer(
  // "GET /api/mixed-content/top-websites-with-mixed-content" requests
  rest.get(
    '/api/mixed-content/top-websites-with-mixed-content',
    (req, res, ctx) => {
      return res(
        ctx.json({
          result: new Array(dataArrayMockLength).fill().map(() => ({
            url: faker.internet.url(),
            mixed_percentage: (Math.random() * 100).toFixed(2),
            mixed_reqs_total: Math.random(),
          })),
        }),
      );
    },
  ),
  // "GET /api/mixed-content/mixed-content-percentage-histogram" requests
  rest.get(
    '/api/mixed-content/mixed-content-percentage-histogram',
    (req, res, ctx) => {
      return res(
        ctx.json({
          result: new Array(dataArrayMockLength).fill().map(() => ({
            mixed_percentage: (Math.random() * 100).toFixed(2),
            total: Math.random(),
          })),
        }),
      );
    },
  ),
  // "GET /api/mixed-content/hsts-percentage-requests" requests
  rest.get('/api/mixed-content/hsts-percentage-requests', (req, res, ctx) => {
    return res(
      ctx.json({
        result: new Array(dataArrayMockLength).fill().map(() => ({
          year: Math.random(),
          percentage: Math.random(),
        })),
      }),
    );
  }),
  // "GET /api/mixed-content/https-percentage-pages" requests
  rest.get('/api/mixed-content/https-percentage-pages', (req, res, ctx) => {
    return res(
      ctx.json({
        result: new Array(dataArrayMockLength).fill().map(() => ({
          timestamp: Date.now(),
          percentage: Math.random(),
          client: Math.random() > 0.5 ? 'mobile' : 'desktop',
        })),
      }),
    );
  }),
  // "GET /api/mixed-content/https-percentage-requests" requests
  rest.get('/api/mixed-content/https-percentage-requests', (req, res, ctx) => {
    return res(
      ctx.json({
        result: new Array(dataArrayMockLength).fill().map(() => ({
          timestamp: Date.now(),
          percentage: Math.random(),
          client: Math.random() > 0.5 ? 'mobile' : 'desktop',
        })),
      }),
    );
  }),
  // "GET /api/mixed-content/top-countries-with-
  //      more-websites-more-government-with-mixed-content" requests
  rest.get(
    '/api/mixed-content/top-countries' +
      '-with-more-government-websites-with-mixed-content',
    (req, res, ctx) => {
      return res(
        ctx.json({
          result: new Array(dataArrayMockLength).fill().map(() => ({
            id: faker.address.countryCode(),
            value: Math.random(),
          })),
        }),
      );
    },
  ),
  // "GET /api/mixed-content/top-government-websites-
  //    with-mixed-content" requests
  rest.get(
    '/api/mixed-content/top-government-websites-with-mixed-content',
    (req, res, ctx) => {
      return res(
        ctx.json({
          result: new Array(dataArrayMockLength).fill().map(() => ({
            url: faker.internet.url(),
            mixed_content_resources: Math.random(),
          })),
        }),
      );
    },
  ),
);

// establish API mocking before all tests
beforeAll(() => server.listen());
// reset any request handlers that are declared as a part of our tests
// (i.e. for testing one-time error scenarios)
afterEach(() => server.resetHandlers());
// clean up once the tests are done
afterAll(() => server.close());
