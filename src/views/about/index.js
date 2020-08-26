import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import React from 'react';
import {Typography} from '@material-ui/core';
import {
  AccordionTextContainer,
  Container,
  ContributorAvatar,
  Icon,
  Logo,
  TitleContainer,
  TitleTextContainer,
} from './elements';

/**
 * About View
 *
 * Renders everything under /about route.
 * It contains a description of the data and the purpose for
 * the app.
 *
 * @return {ReactNode} About View
 */
const About = () => {
  return (
    <Container data-testid="about">
      <TitleContainer>
        <Logo src="/images/chromium.png" alt="Chrome Security UX" />
        <TitleTextContainer>
          <Typography variant="h2">Chrome Security UX</Typography>
          <Typography variant="h6">Supporting Chrome Deprecations</Typography>
        </TitleTextContainer>
      </TitleContainer>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="subtitle2">
            Why is the Chrome Security Dashboard needed?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <AccordionTextContainer>
            <Typography gutterBottom variant="body1">
              The Chrome Security UX team often needs changes that, while
              security positive, can cause breakage of web content (e.g. mixed
              content, HTTP vs HTTPs, forms, etc).
            </Typography>
            <Typography gutterBottom variant="body1">
              Because of that, it is a problem when Chrome is going to launch a
              new feature or to deprecate any functionality. That&lsquo;s why we
              aim to provide useful data to measure breakage before rolling out
              changes, to see if benefit is worth it.
            </Typography>
            <Typography gutterBottom variant="body1">
              The Chrome Security Dashboard is intended to present public data
              about future changes to be done in future Chrome Versions, and to
              serve as a tool to negotiate next steps with other browsers.
            </Typography>
          </AccordionTextContainer>
          <Icon alt="Protection" src="images/protection.png" />
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="subtitle2">
            Where do we get the data from?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <AccordionTextContainer>
            <Typography gutterBottom variant="body1">
              As part of our effort to show enough data to support decisions, we
              evaluated many options of public data sources and ended up using
              HTTP Archive public data sets hosted on BigQuery service on Google
              Cloud. This data is public and accessible from all over the world,
              which give us enough confidence to use it as a reference to make
              decisions
            </Typography>
            <Typography gutterBottom variant="body1">
              If you want to learn more about the HTTP Archive Big Query
              Connection, you can do it{' '}
              <Link href="https://github.com/HTTPArchive/httparchive.org/blob/master/docs/gettingstarted_bigquery.md">
                here.
              </Link>
              You can always validate the data we are showing here by running
              queries on the datasets published by HTTP Archive
            </Typography>
          </AccordionTextContainer>
          <Icon alt="Protection" src="images/http-archive.png" />
        </AccordionDetails>
      </Accordion>
      <Typography variant="h6">Contributors</Typography>
      <Grid container spacing={6}>
        <Grid item sm={12} md={4}>
          <Card>
            <CardContent>
              <ContributorAvatar src="https://avatars0.githubusercontent.com/u/33379285" />
              <Typography variant="subtitle1" align="center">
                Ernesto Garcia
              </Typography>
              <Link>
                <Typography
                  href="https://github.com/ernestognw"
                  variant="subtitle2"
                  align="center"
                >
                  @ernestognw
                </Typography>
              </Link>
            </CardContent>
          </Card>
        </Grid>
        <Grid item sm={12} md={4}>
          <Card>
            <CardContent>
              <ContributorAvatar src="https://avatars0.githubusercontent.com/u/22694942" />
              <Typography variant="subtitle1" align="center">
                Jonathan Chavez
              </Typography>
              <Link>
                <Typography
                  href="https://github.com/JonathanChavezTamales"
                  variant="subtitle2"
                  align="center"
                >
                  @JonathanChavezTamales
                </Typography>
              </Link>
            </CardContent>
          </Card>
        </Grid>
        <Grid item sm={12} md={4}>
          <Card>
            <CardContent>
              <ContributorAvatar src="https://avatars0.githubusercontent.com/u/25649623" />
              <Typography variant="subtitle1" align="center">
                Sofia Vega
              </Typography>
              <Link>
                <Typography
                  href="https://github.com/SofiaVega"
                  variant="subtitle2"
                  align="center"
                >
                  @SofiaVega
                </Typography>
              </Link>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default About;
