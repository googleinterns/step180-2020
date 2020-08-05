import Card from '@material-ui/core/Card';
import {CardContent} from '@material-ui/core';
import React, {useEffect, useState} from 'react';
import {api} from '../../../client';
import {ResponsivePie} from '@nivo/pie';
import {ChartContainer} from '../../mixed-content/top-countries-with-more-websites-with-mixed-content/elements';

/**
 * This component shows a pie chart with the number of requests
 * per TLS version in the sample data requests table.
 *
 * @return {ReactNode} TLS versions component
 */
const TLSversion = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    api.get('/api/tls/test-json').then((response) => {
      setData(response.data.result);
    }).catch((err) => {
      console.log(err);
    });
  });
  return (
    <Card>
      <CardContent>
        <h1>TLS versions</h1>
        <p>Number of requests by TLS version</p>
        <ChartContainer>
          <ResponsivePie
            data={data}
            margin={{top: 40, right: 80, bottom: 80, left: 80}}
            innerRadius={0.5}
            padAngle={0.7}
            cornerRadius={3}
            colors={{scheme: 'nivo'}}
            animate={true}
          />
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default TLSversion;
