import React from 'react';
import TopGovernmentWebsitesWithMixedContent
  from './top-government-websites-with-mixed-content';
import TopCountriesWithMoreWebsitesWithMixedContent
  from './top-countries-with-more-websites-with-mixed-content';
import TopWebsitesWithMixedContent
  from './top-websites-with-mixed-content';
import MixedContentPercentageHistogram
  from './mixed-content-percentage-histogram';
import MixedContentByType
  from './mixed-content-by-type';

/**
 * Mixed Content View
 *
 * Renders everythin under /mixed-content route, so, feel free
 * to create subcomponents in order to keep this as a view summary
 * with the list of components used.
 *
 * @return {ReactNode} Mixed Content View
 */
const MixedContent = () => {
  return (
    <div data-testid="mixed-content">
      <h1>Mixed Content</h1>
      <h2>Government websites</h2>
      <p>Websites were considered from a government if they have
         .gov or .gob in their origins. This may lead to many false
         positives such as gov.hello.mywebsite.com.</p>
      <TopGovernmentWebsitesWithMixedContent />
      <TopCountriesWithMoreWebsitesWithMixedContent/>
      <TopWebsitesWithMixedContent/>
      <MixedContentPercentageHistogram/>
      <MixedContentByType/>
    </div>
  );
};

export default MixedContent;
