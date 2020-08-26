import {Container} from './elements';
import Grid from '@material-ui/core/Grid';
import HSTSPercentageRequests from './hsts-percentage-requests';
import HTTPSPercentagePages from './https-percentage-pages';
import HTTPSPercentageRequests from './https-percentage-requests';
import Link from '@material-ui/core/Link';
import React from 'react';
import {Typography} from '@material-ui/core';

const Trends = () => {
  return (
    <Container data-testid="mixed-content-trends">
      <Typography variant="h2" gutterBottom={true}>
        Trends
      </Typography>
      <Typography variant="overline" gutterBottom={true}>
        Usage trends of <b>HTTPS</b> and <b>HSTS</b>.
      </Typography>
      <Typography variant="h6" gutterBottom={true}>
        Where are we going?
      </Typography>

      <Typography paragraph={true}>
        HTTPS adoption has been steadily increasing thanks to efforts to make
        the web more secure. HTTPS loads jumped from{' '}
        <b>20% to 80% in ~4 years</b>.
      </Typography>
      <Typography paragraph={true}>
        You can find more information in{' '}
        <Link
          href="https://research.google/pubs/pub46197/"
          target="_blank"
          rel="noopener"
        >
          this Google publication
        </Link>
        .
      </Typography>
      <HTTPSPercentageRequests />
      <Typography variant="h5" gutterBottom={true}>
        HSTS
      </Typography>
      <Typography paragraph={true}>
        <b>HSTS</b> refers to the Strict-Transport-Security header, this header
        tells the browser that the resource should be strictly loaded through
        HTTPS, if it is loaded through HTTP it will automatically upgrade it to
        HTTPS.
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <HTTPSPercentagePages />
        </Grid>
        <Grid item xs={12} sm={6}>
          <HSTSPercentageRequests />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Trends;
