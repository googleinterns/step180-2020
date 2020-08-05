import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import React, {useState, useEffect} from 'react';
import {api} from '../../../client';
import {ResponsiveBar} from '@nivo/bar';
import {ChartContainer} from './elements';

const TopWebsitesWithMixedContent = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    api
        .get('/api/mixed-content/top'+
        '-websites-with-mixed-content')
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
        <h2>Top websites with more mixed content</h2>
        <p>Websites that contain more mixed content</p>
        <ChartContainer>
          {!loading ? (
            <ResponsiveBar
              data={data}
              colors={{scheme: 'accent'}}
              colorBy='index'
              keys={[
                'mixed_reqs_total',
              ]}
              indexBy="url"
              axisLeft={{
                legend: 'Mixed content resources',
                legendPosition: 'middle',
                legendOffset: -40,
              }}
              axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                legend: 'URLs',
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
        <p>These are the percentages of mixed content of
          all content from the websites above.</p>
        <ChartContainer>
          {!loading ? (
            <ResponsiveBar
              data={data}
              colors={{scheme: 'accent'}}
              colorBy='index'
              keys={[
                'mixed_percentage',
              ]}
              indexBy="url"
              axisLeft={{
                legend: 'Mixed content resources',
                legendPosition: 'middle',
                legendOffset: -40,
              }}
              axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                legend: 'URLs',
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

export default TopWebsitesWithMixedContent;
