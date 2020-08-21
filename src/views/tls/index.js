import {Container} from './elements';
import Grid from '@material-ui/core/Grid';
import KeyExchange from './key-exchange/index.js';
import React from 'react';
import TLSversion from './tls-version/index.js';
import Typography from '@material-ui/core/Typography';

/**
 * TLS view
 * List of components for TLS-related visualizations
 *@return {ReactNode} TLS view
 */
const Tls = () => {
  return (
    <Container data-testid="tls">
      <Typography variant="h4">TLS Encryption</Typography>
      <Typography variant="subtitle1">
        TLS Encryption usage distribution across the web
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TLSversion />
        </Grid>
        <Grid item xs={12} sm={6}>
          <KeyExchange />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Tls;
