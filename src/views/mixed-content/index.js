import Government from './government';
import React from 'react';
import Trends from './trends';
import Worldwide from './worldwide';
import {Switch, Route, Redirect} from 'react-router-dom';

/**
 * Mixed Content View
 *
 * Renders everything under /mixed-content route, so, feel free
 * to create subroutes in order to keep this as a view summary
 * with the list of components used.
 *
 * @return {ReactNode} Mixed Content View
 */
const MixedContent = () => {
  return (
    <Switch>
      <Route path="/mixed-content/worldwide" component={Worldwide} />
      <Route path="/mixed-content/trends" component={Trends} />
      <Route path="/mixed-content/government" component={Government} />
      <Redirect to="//mixed-content/worldwide" />
    </Switch>
  );
};

export default MixedContent;
