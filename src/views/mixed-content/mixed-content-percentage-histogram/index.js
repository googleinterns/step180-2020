import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import React, {useState, useEffect} from 'react';
import {api} from '../../../client';
import {ResponsiveBar} from '@nivo/bar';
import {ChartContainer} from './elements';

const MixedContentPercentageHistogram = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    api
        .get('/api/mixed-content/mixed-content-percentage-histogram')
        .then((response) => {
          setData(response.data.result);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
  }, []);

  return (
    <Card>
      <CardContent>
        <h2>Mixed content percentage</h2>
        <p>Histogram of the percentage of mixed content of all websites.</p>
        <ChartContainer>
          {!loading ? (
            <ResponsiveBar
              data={data}
              colors={{scheme: 'accent'}}
              colorBy='id'
              keys={[
                'total',
              ]}
              indexBy="mixed_percentage"
              axisLeft={{
                legend: 'Total websites',
                legendPosition: 'middle',
                legendOffset: -50,
              }}
              axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                legend: 'Mixed content percentage in the website.',
                legendPosition: 'middle',
                legendOffset: 32,
              }}
              margin={{top: 50, right: 130, bottom: 50, left: 60}}
              padding={0.4}
            />
          ) : (
            <CircularProgress />
          )}
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default MixedContentPercentageHistogram;
