import React from 'react';
import {Typography} from '@material-ui/core';

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
    <div data-testid="about">
      <Typography variant="h1">Enamel Dashboard</Typography>
    </div>
  );
};

export default About;
