import Card from '@material-ui/core/Card';
import {CardContent} from '@material-ui/core';
import React, {useEffect, useState} from 'react';
import {api} from '../../../client';
import {ResponsivePie} from '@nivo/pie';
import {ChartContainer} from '../top-government-websites-with-mixed-content/elements';

/**
 * This component shows a pie chart with the number of requests
 * per TLS version in the sample data requests table.
 *
 * @return {ReactNode} TLS versions component
 */
const MixedContentByType = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    api.get('/api/mixed-content/mixed-content-by-type').then((response) => {
      setData(response.data.result);
    }).catch((err) => {
      console.log(err);
    });
  });
  return (
    <Card>
      <CardContent>
        <h1>TLS versions</h1>
        <p>{JSON.stringify(data)}</p>
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

export default MixedContentByType;
