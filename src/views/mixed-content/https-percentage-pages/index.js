import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import MuiAlert from '@material-ui/lab/Alert';
import React, {useState, useEffect} from 'react';
import {api} from '../../../client';
import {ChartContainer} from './elements';
import {ResponsiveLine} from '@nivo/line';
import {Typography, Snackbar} from '@material-ui/core';


const HTTPSPercentagePages = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [snackOpen, setSnackOpen] = useState(false);

  useEffect(() => {
    api
        .get('/api/mixed-content/https-percentage-pages')
        .then((response) => {
          // Format data from sql for nivo in (x,y) properties
          const formattedData = [];
          response.data.result.forEach((element) => {
            const newElement = {};
            newElement.x = formatDate(new Date(element.timestamp));
            newElement.y = element.percent;
            // Clean all percentages less than 5%.
            if (element.percent > 5.0) {
              formattedData.push(newElement);
            }
          });
          setData(formattedData);
          setLoading(false);
        })
        .catch((err) => {
          setSnackOpen(true);
        });
  }, []);

  const formatDate = (date) => {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }

    return [year, month, day].join('-');
  };


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
          Percentage of HTTPS websites of all websites
        </Typography>
        <Typography paragraph={true}>
          Time Series of the percentage of websites that load through HTTPS.
        </Typography>
        <ChartContainer>
          {!loading ? (
            <ResponsiveLine
              data={data}
              margin={{top: 50, right: 110, bottom: 50, left: 60}}
              xScale={{type: 'point'}}
              yScale={{type: 'linear', min: 'auto', max: 'auto',
                stacked: true, reverse: false}}
              curve="natural"
              axisTop={null}
              axisRight={null}
              axisBottom={{
                orient: 'bottom',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Date',
                legendOffset: 36,
                legendPosition: 'middle',
              }}
              axisLeft={{
                orient: 'left',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Percentage',
                legendOffset: -40,
                legendPosition: 'middle',
              }}
              colors={{scheme: 'nivo'}}
              enablePointLabel={true}
              lineWidth={8}
              pointSize={10}
              pointColor={{theme: 'background'}}
              pointBorderWidth={2}
              pointBorderColor={{from: 'serieColor'}}
              pointLabel="y"
              pointLabelYOffset={-12}
              useMesh={true}
              legends={[
                {
                  anchor: 'bottom-right',
                  direction: 'column',
                  justify: false,
                  translateX: 100,
                  translateY: 0,
                  itemsSpacing: 0,
                  itemDirection: 'left-to-right',
                  itemWidth: 80,
                  itemHeight: 20,
                  itemOpacity: 0.75,
                  symbolSize: 12,
                  symbolShape: 'circle',
                  symbolBorderColor: 'rgba(0, 0, 0, .5)',
                  effects: [
                    {
                      on: 'hover',
                      style: {
                        itemBackground: 'rgba(0, 0, 0, .03)',
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

export default HTTPSPercentagePages;
