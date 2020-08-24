import {api} from 'client';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import {ChartContainer} from './elements';
import CircularProgress from '@material-ui/core/CircularProgress';
import MuiAlert from '@material-ui/lab/Alert';
import {ResponsiveLine} from '@nivo/line';
import {Snackbar} from '@material-ui/core';
import React, {useEffect, useState} from 'react';

const HSTSPercentageRequests = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [snackOpen, setSnackOpen] = useState(false);

  useEffect(() => {
    api
      .get('/api/mixed-content/hsts-percentage-requests')
      .then((response) => {
        // Response data is formated to fit nivo requirements
        // nivo schema: {x: data, y: data}
        const formattedData = [];
        response.data.result.forEach((element) => {
          const newElement = {};
          newElement.x = element.year;
          newElement.y = element.percent;
          formattedData.push(newElement);
        });
        setData(formattedData);
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
    <Card data-testid="hsts-percentage-requests-card">
      <CardHeader
        title="Percentage of resources with HSTS header"
        subheader="Time Series of the percentage of resources that contain the
          Strict-Transport-Security header."
      />
      <CardContent>
        {!loading ? (
          <ChartContainer data-testid="hsts-percentage-requests-chart">
            <ResponsiveLine
              data={[{id: 'desktop', data: data}]}
              margin={{top: 20, right: 50, bottom: 100, left: 50}}
              xScale={{type: 'point'}}
              yScale={{
                type: 'linear',
                min: 'auto',
                stacked: false,
                reverse: false,
              }}
              curve="natural"
              axisTop={null}
              axisRight={null}
              axisBottom={{
                orient: 'bottom',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Year',
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
              colors={{scheme: 'category10'}}
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

export default HSTSPercentageRequests;
