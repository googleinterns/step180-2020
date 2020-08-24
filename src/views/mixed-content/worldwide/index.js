import {Container} from './elements';
import Grid from '@material-ui/core/Grid';
import MixedContentByType from './mixed-content-by-type';
import MixedContentPercentageHistogram from './mixed-content-percentage-histogram';
import React from 'react';
import TopWebsitesWithMixedContent from './top-websites-with-mixed-content';
import {Typography} from '@material-ui/core';

const Worldwide = () => {
  return (
    <Container data-testid="mixed-content-worldwide">
      <Typography variant="h2" gutterBottom={true}>Worldwide</Typography>
      <Typography variant="overline" gutterBottom={true}>
        Current state of <b>mixed content</b> in the web.
      </Typography>
      <Typography variant="h6" gutterBottom={true}>
        What is mixed content and why is it important?
      </Typography>
      <Typography paragraph={true}>
        <b>Mixed content</b> occurs when there are resources loaded through HTTP in a website initially loaded with HTTPS.
        These resources can be images, videos, <b>JavaScript</b> or even <b>CSS</b>. Modern browsers try to upgrade
        the connections, others block them and many just alert the user.
      </Typography>
      <Typography paragraph={true}>
      <i>Man-in-the-middle (MITM)</i> attacks take advantage of these resources because HTTP does not use any protocol to protect the information.
      </Typography>
      <TopWebsitesWithMixedContent />
      <Typography variant={'h6'} gutterBottom={true}>Mixed content types</Typography>
      <Typography paragraph={true}>
        There are two types of mixed content: <i>active</i> and <i>passive</i>.
      </Typography>
      <Typography paragraph={true}>
      <b>Active content</b> can interact with the page such as scripts, if intercepted, they could do almost anything with the website.
      </Typography>
      <Typography paragraph={true}>
        
        <b>Passive content</b> cannot interact with the page but can still be intercepted and monitored.
      </Typography>
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
