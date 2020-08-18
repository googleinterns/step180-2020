import React from 'react';
import KeyExchange from './key-exchange/index.js';
import TLSversion from './tls-version/index.js';
import Typography from '@material-ui/core/Typography';

/**
 * TLS view
 * List of components for TLS-related visualizations
 *@return {ReactNode} TLS view
 */
const Tls = () => {
  return (
    <div data-testid="tls">
      <Typography variant="h1">TLS Visualizations</Typography>
      <TLSversion/>
      <KeyExchange/>
    </div>
  );
};

export default Tls;
