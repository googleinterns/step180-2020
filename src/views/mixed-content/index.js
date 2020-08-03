import React from 'react';
import TopGovernmentWebsitesWithMixedContent
  from './top-government-websites-with-mixed-content';
import TopCountriesWithMoreWebsitesWithMixedContent
  from './top-countries-with-more-websites-with-mixed-content';

/**
 * Mixed Content View
 *
 * This component should have everything to be rendered
 * under /mixed-content route, so, feel free to create subcomponents
 * in order to keep this as a view summary with the list of
 * components used.
 *
 * @return {ReactNode} Mixed Content View
 */
const MixedContent = () => {
  // TO-DO(ernestognw): To fill with mixed-content data graphs

  return (
    <div data-testid="mixed-content">
      <h1>Mixed Content</h1>
      <h2>Government websites</h2>
      <p>Websites were considered from a government if they have
         .gov or .gob in their origins. This may lead to many false
         positives such as gov.hello.mywebsite.com.</p>
      <TopGovernmentWebsitesWithMixedContent />
      <TopCountriesWithMoreWebsitesWithMixedContent/>
    </div>
  );
};

export default MixedContent;
