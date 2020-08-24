import {Container} from './elements';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import TopCountriesWithMoreWebsitesWithMixedContent from './top-countries-with-more-websites-with-mixed-content';
import TopGovernmentWebsitesWithMixedContent from './top-government-websites-with-mixed-content';
import {Typography} from '@material-ui/core';

const Government = () => {
  return (
    <Container data-testid="mixed-content-government">
      <Typography variant="h2" gutterBottom={true}>Government</Typography>
      <Typography variant="overline" gutterBottom={true}>
        Summary of mixed content present in <b>government websites</b>.
      </Typography>
      <Typography variant="h6">
        Why analyze government websites?
      </Typography>
      <Typography paragraph={true}>
        Governmental websites are unfortunately the ones that contain the most percentage of <b>mixed content</b> resources,
        this makes them a great attack target because they are popular and there&apos;s a great flux of sensitive information in them to be sniffed.
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
        <TopCountriesWithMoreWebsitesWithMixedContent />
        </Grid>
        <Grid item xs={12} sm={6}>
        <TopCountriesWithMoreWebsitesWithMixedContent />
        </Grid>
      </Grid>
      
      <TopGovernmentWebsitesWithMixedContent />
    </Container>
  );
};

export default Government;
