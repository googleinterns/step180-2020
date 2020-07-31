import React, { useState, useEffect } from 'react';
import { ResponsiveBar } from '@nivo/bar';
import axios from 'axios';

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
  const [data, setData] = useState(0);

  useEffect(() => {
    axios
      .get(
        'http://localhost:4000/api/mixed-content/top-government-websites-with-mixed-content'
      )
      .then((response) => {
        console.log('llamada');
        setData(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div data-testid="mixed-content">
      <p>Mixed Content</p>
      MOCK DATA:
      {JSON.stringify(data.result)}
    </div>
  );
};

export default MixedContent;
