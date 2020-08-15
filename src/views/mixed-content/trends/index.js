import React from 'react';
import {Container} from './elements';
import Grid from '@material-ui/core/Grid';
import {Typography} from '@material-ui/core';
import HTTPSPercentagePages from './https-percentage-pages';
import HTTPSPercentageRequests from './https-percentage-requests';
import HSTSPercentageRequests from './hsts-percentage-requests';

const Trends = () => {
  return (
    <Container data-testid="mixed-content-trends">
      <Typography variant="h4">Trends</Typography>
      <Typography variant="subtitle1">
        Trends of HTTPS adoption throughout the web in websites and resources.
      </Typography>
      <HTTPSPercentageRequests />
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
