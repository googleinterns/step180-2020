import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CircularProgress from '@material-ui/core/CircularProgress';
import moment from 'moment';
import MuiAlert from '@material-ui/lab/Alert';
import React, {useState, useEffect} from 'react';
import {api} from 'client';
import {ChartContainer} from './elements';
import {ResponsiveLine} from '@nivo/line';
import {Snackbar} from '@material-ui/core';

const HTTPSPercentagePages = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [snackOpen, setSnackOpen] = useState(false);

  useEffect(() => {
    api
      .get('/api/mixed-content/https-percentage-pages')
      .then((response) => {
        // Response data is formated to fit nivo requirements
        // nivo schema: {x: data, y: data}
        const mobileData = [];
        const desktopData = [];
        response.data.result.forEach((element) => {
          const newElement = {};
          newElement.x = moment(element.timestamp).format('L');
          newElement.y = element.percent;
          newElement.client = element.client;
          if (newElement.client === 'mobile') {
            mobileData.push(newElement);
          } else {
            desktopData.push(newElement);
          }
        });
        setData([
          {
            id: 'mobile',
            data: mobileData,
          },
          {
            id: 'desktop',
            data: desktopData,
          },
        ]);
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
    <Card data-testid="https-percentage-pages-card">
      <CardHeader
        title=" Percentage of HTTPS websites of all websites"
        subheader="Time Series of the percentage of websites that load through
          HTTPS. Broken down by desktop and mobile."
      />
      <CardContent>
        {!loading ? (
          <ChartContainer data-testid="https-percentage-pages-chart">
            <ResponsiveLine
              data={data}
              margin={{top: 20, right: 50, bottom: 100, left: 50}}
              xScale={{type: 'point'}}
              yScale={{
                type: 'linear',
                min: 'auto',
                stacked: true,
                reverse: false,
              }}
              curve="natural"
              axisTop={null}
              axisRight={null}
              axisBottom={{
                orient: 'bottom',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: -60,
                legend: 'Date',
                legendOffset: 70,
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
              lineWidth={3}
              pointSize={10}
              pointColor={{theme: 'background'}}
              pointBorderWidth={2}
              pointBorderColor={{from: 'serieColor'}}
              pointLabel="y"
              pointLabelYOffset={-12}
              useMesh={true}
              legends={[
                {
                  anchor: 'bottom-left',
                  direction: 'row',
                  justify: false,
                  translateX: 0,
                  translateY: 100,
                  itemsSpacing: 20,
                  itemDirection: 'left-to-right',
                  itemWidth: 120,
                  itemHeight: 20,
                  symbolSize: 12,
                  symbolShape: 'circle',
                  symbolBorderColor: 'rgba(0, 0, 0, .5)',
                },
              ]}
            />
          </ChartContainer>
        ) : (
          <ChartContainer>
            <CircularProgress data-testid="chart-loader" />
          </ChartContainer>
        )}
      </CardContent>
      <Snackbar open={snackOpen} autoHideDuration={6000} onClose={handleClose}>
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleClose}
          severity="error"
        >
          Could not load chart
        </MuiAlert>
      </Snackbar>
    </Card>
  );
};

export default HTTPSPercentagePages;
