import React from 'react';
import TLSversion from './tls-version/index.js';

/**
 * TLS view
 * List of components for TLS-related visualizations
 *@return {ReactNode} TLS view
 */
const tls = () => {
  return (
    <div data-testid="tls">
      <h1>TLS Visualizations</h1>
      <TLSversion/>
    </div>
  );
};

export default tls;
