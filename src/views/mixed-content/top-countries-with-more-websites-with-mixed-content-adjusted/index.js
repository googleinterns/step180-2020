import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import MuiAlert from '@material-ui/lab/Alert';
import React, {useState, useEffect} from 'react';
import {api} from '../../../client';
import {ChartContainer} from './elements';
import {ResponsiveChoropleth} from '@nivo/geo';
import {Typography, Snackbar} from '@material-ui/core';
import * as features from './features.json';


const TopCountriesWithMoreWebsitesWithMixedContentAdjusted = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [snackOpen, setSnackOpen] = useState(false);


  useEffect(() => {
    api
        .get('/api/mixed-content/top-countries' +
        '-with-more-government-websites-with-mixed-content-adjusted')
        .then((response) => {
          setData(response.data.result);
          console.log(response.data.result);
          setLoading(false);
        })
        .catch((err) => {
          setSnackOpen(true);
        });
  }, []);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackOpen(false);
  };

  return (
    <Card>
      <CardContent>
        <Typography variant={'h3'}>
        Top countries by percentage of government websites
        with mixed content from the total.
        </Typography>
        <Typography paragraph={true}>
        This is the adjusted chart from above that is basically <b>(# gov sites
        with mixed content) / (# gov sites)</b>.
        </Typography>
        <Typography paragraph={true}>
          As you can see, 67% of Mexico&apos;s government websites
          have some type of mixed content.
        </Typography>
        <ChartContainer>
          {!loading ? (
            <ResponsiveChoropleth
              data={data}
              features={features.features}
              margin={{top: 0, right: 0, bottom: 0, left: 0}}
              colors="YlOrRd"
              domain={[0, 100]}
              unknownColor="#666666"
              label="properties.name"
              valueFormat=".2s"
              projectionTranslation={[0.5, 0.5]}
              projectionRotation={[0, 0, 0]}
              enableGraticule={true}
              graticuleLineColor="#dddddd"
              borderWidth={0.5}
              borderColor="#152538"
              axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                legend: 'Countries',
                legendPosition: 'middle',
                legendOffset: 32,
              }}
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
      <Snackbar open={snackOpen} autoHideDuration={6000} onClose={handleClose}>
        <MuiAlert elevation={6} variant="filled"
          onClose={handleClose} severity="error">
          Could not load chart
        </MuiAlert>
      </Snackbar>
    </Card>
  );
};

export default TopCountriesWithMoreWebsitesWithMixedContentAdjusted;
