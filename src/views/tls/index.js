import React from 'react';
import TLSversion from './tls-version/index.js';
import Typography from '@material-ui/core/Typography';

/**
 * TLS view
 * List of components for TLS-related visualizations
 *@return {ReactNode} TLS view
 */
const tls = () => {
  return (
    <div data-testid="tls">
      <Typography variant="h1">TLS Visualizations</Typography>
      <TLSversion />
    </div>
  );
};

export default tls;
