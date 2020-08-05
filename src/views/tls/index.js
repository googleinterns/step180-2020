import React from 'react';
import TLSversion from './tls-version/index.js';

/**
 *@return {ReactNode}
 */
const tls = () => {
  return (
    <div data-testid="tls">
      <h1>Hola</h1>
      <TLSversion/>
    </div>
  );
};

export default tls;
