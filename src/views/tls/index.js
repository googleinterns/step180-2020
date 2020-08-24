import {Container} from './elements';
import Grid from '@material-ui/core/Grid';
import KeyExchange from './key-exchange/index.js';
import Link from '@material-ui/core/Link';
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
      <Typography variant="h2" gutterBottom={true}>
        TLS
      </Typography>
      <Typography variant="overline" gutterBottom={true}>
        Current <b>encryption</b> configurations in the web
      </Typography>
      <Typography variant="h6" gutterBottom={true}>
        What is TLS?
      </Typography>
      <Typography paragraph={true}>
        <b>Transport Layer Security (TLS)</b> is a protocol used to provide
        privacy between a client and a server using{' '}
        <i>public-key cryptography</i>, this protocol relies on third party
        authorities known as <b>Certificate Authorities (CA) </b>
        which establish authenticity of certificates used to verify the
        ownership of a public key of a website when using TLS.
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <TLSversion />
        </Grid>
        <Grid item xs={12} sm={12}>
          <Typography variant="h6" gutterBottom={true}>
            Key Exchange
          </Typography>
          <Typography paragraph={true}>
            Before exchanging information, both parties should agree upon an
            algorithm to generate <b>cryptographic keys</b> and a{' '}
            <b>digital signature algorithm</b>. This is needed to encrypt all
            data shared between the client and the server. In{' '}
            <Link
              href="https://security.googleblog.com/2018/10/modernizing-transport-security.html"
              target="_blank"
              rel="noopener"
            >
              this blog
            </Link>{' '}
            you can read more about the modern TLS configurations.
          </Typography>
          <KeyExchange />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Tls;
