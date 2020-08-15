import React from 'react';
import {Container} from './elements';
import {Typography} from '@material-ui/core';
import MixedContentPercentageHistogram
  from './mixed-content-percentage-histogram';
import TopWebsitesWithMixedContent
  from './top-websites-with-mixed-content';

const MixedContentInTheWeb = () => {
  return (
    <Container>
      <Typography variant="h4">Worldwide</Typography>
      <Typography variant="subtitle1">
        Mixed content data websites around the world
      </Typography>
      <TopWebsitesWithMixedContent />
      <MixedContentPercentageHistogram />
    </Container>
  );
};

export default MixedContentInTheWeb;
