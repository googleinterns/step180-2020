import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import React, {useState, useEffect} from 'react';
import {api} from '../../../client';
import {ChartContainer} from './elements';
import {ResponsiveChoropleth} from '@nivo/geo';
import * as features from './features.json';


const TopCountriesWithMoreWebsitesWithMixedContent = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    api
        .get('/api/mixed-content/top-countries' +
        '-with-more-websites-with-mixed-content')
        .then((response) => {
          setData(response.data.result);
          console.log('fetched');
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
  }, []);

  return (
    <Card>
      <CardContent>
        <h2>Top government websites with more mixed content</h2>
        <p>Total number of HTTPS Government
          websites that contain mixed content.</p>
        <ChartContainer>
          {!loading ? (
            <ResponsiveChoropleth
              data={data}
              features={features.features}
              margin={{top: 0, right: 0, bottom: 0, left: 0}}
              colors="YlOrRd"
              domain={[0, 10000]}
              unknownColor="#666666"
              label="properties.name"
              valueFormat=".2s"
              projectionTranslation={[0.5, 0.5]}
              projectionRotation={[0, 0, 0]}
              enableGraticule={true}
              graticuleLineColor="#dddddd"
              borderWidth={0.5}
              borderColor="#152538"
              legends={[
                {
                  anchor: 'bottom-left',
                  direction: 'column',
                  justify: true,
                  translateX: 200,
                  translateY: -100,
                  itemsSpacing: 0,
                  itemWidth: 94,
                  itemHeight: 18,
                  itemDirection: 'left-to-right',
                  itemTextColor: '#444444',
                  itemOpacity: 0.85,
                  symbolSize: 18,
                  effects: [
                    {
                      on: 'hover',
                      style: {
                        itemTextColor: '#000000',
                        itemOpacity: 1,
                      },
                    },
                  ],
                },
              ]}
            />
          ) : (
            <CircularProgress />
          )}
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default TopCountriesWithMoreWebsitesWithMixedContent;
