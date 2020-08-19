import React from 'react';
import Grid from '@material-ui/core/Grid';
import MixedContentPercentageHistogram from './mixed-content-percentage-histogram';
import MixedContentByType from './mixed-content-by-type';
import TopWebsitesWithMixedContent from './top-websites-with-mixed-content';
import {Container} from './elements';
import {Typography} from '@material-ui/core';

const Worldwide = () => {
  return (
    <Container data-testid="mixed-content-worldwide">
      <Typography variant="h4">Worldwide</Typography>
      <Typography variant="subtitle1">
        Mixed content data websites around the world
      </Typography>
      <TopWebsitesWithMixedContent />
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <MixedContentPercentageHistogram />
        </Grid>
        <Grid item xs={12} sm={6}>
          <MixedContentByType />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Worldwide;
