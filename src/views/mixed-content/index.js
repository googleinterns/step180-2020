import React from 'react';
import TopGovernmentWebsitesWithMixedContent
  from './top-government-websites-with-mixed-content';

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
      <TopGovernmentWebsitesWithMixedContent />
    </div>
  );
};

export default MixedContent;
