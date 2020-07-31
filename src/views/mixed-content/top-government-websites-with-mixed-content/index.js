import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import React, {useState, useEffect} from 'react';
import {api} from '../../../client';
import {ResponsiveBar} from '@nivo/bar';
import {ChartContainer} from './elements';

const TopGovernmentWebsitesWithMixedContent = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    api
        .get('/api/mixed-content/top-government-websites-with-mixed-content')
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
        <ChartContainer>
          {!loading ? (
            <ResponsiveBar
              data={data}
              keys={[
                'mixed_content_resources',
              ]}
              indexBy="url"
              margin={{top: 50, right: 130, bottom: 50, left: 60}}
              padding={0.3}
            />
          ) : (
            <CircularProgress />
          )}
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default TopGovernmentWebsitesWithMixedContent;
