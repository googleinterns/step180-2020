import {Container} from './elements';
import React from 'react';
import TopCountriesWithMoreWebsitesWithMixedContent from './top-countries-with-more-websites-with-mixed-content';
import TopGovernmentWebsitesWithMixedContent from './top-government-websites-with-mixed-content';
import {Typography} from '@material-ui/core';

const Government = () => {
  return (
    <Container data-testid="mixed-content-government">
      <Typography variant="h4">Government</Typography>
      <Typography variant="subtitle1">
        Mixed content in governmental websites around the world
      </Typography>
      <TopCountriesWithMoreWebsitesWithMixedContent />
      <TopGovernmentWebsitesWithMixedContent />
    </Container>
  );
};

export default Government;
