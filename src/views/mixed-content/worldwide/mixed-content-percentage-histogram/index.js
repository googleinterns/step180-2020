import {api} from 'client';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import {ChartContainer} from './elements';
import CircularProgress from '@material-ui/core/CircularProgress';
import MuiAlert from '@material-ui/lab/Alert';
import {ResponsivePie} from '@nivo/pie';
import {Snackbar} from '@material-ui/core';
import React, {useEffect, useState} from 'react';

const MixedContentPercentageHistogram = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [snackOpen, setSnackOpen] = useState(false);

  useEffect(() => {
    api
      .get('/api/mixed-content/mixed-content-percentage-histogram')
      .then((response) => {
        setData(
          response.data.result.map((website) => ({
            ...website,
            id: `${website.mixed_percentage * 100}%`,
            value: website.total,
          })),
        );
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
    <Card data-testid="mixed-content-percentage-card">
      <CardContent>
        <CardHeader
          title="Websites grouped by percentage of mixed content"
          subheader="Many websites already have 0% mixed content,
            but there are still many websites with different percentage
            amounts of mixed content"
        />
        {!loading ? (
          <ChartContainer data-testid="mixed-content-percentage-chart">
            <ResponsivePie
              data={data}
              margin={{top: 40, right: 80, bottom: 80, left: 80}}
              colors={{scheme: 'nivo'}}
              borderWidth={1}
              borderColor={{from: 'color', modifiers: [['darker', 0.2]]}}
              slicesLabelsSkipAngle={100}
              slicesLabelsTextColor="#333333"
              animate={true}
              motionStiffness={90}
              motionDamping={15}
              defs={[
                {
                  id: 'dots',
                  type: 'patternDots',
                  background: 'inherit',
                  color: 'rgba(255, 255, 255, 0.3)',
                  size: 4,
                  padding: 1,
                  stagger: true,
                },
                {
                  id: 'lines',
                  type: 'patternLines',
                  background: 'inherit',
                  color: 'rgba(255, 255, 255, 0.3)',
                  rotation: -45,
                  lineWidth: 6,
                  spacing: 10,
                },
              ]}
              legends={[
                {
                  anchor: 'bottom',
                  direction: 'row',
                  translateY: 56,
                  itemWidth: 100,
                  itemHeight: 18,
                  itemTextColor: '#999',
                  symbolSize: 18,
                  symbolShape: 'circle',
                  effects: [
                    {
                      on: 'hover',
                      style: {
                        itemTextColor: '#000',
                      },
                    },
                  ],
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

export default MixedContentPercentageHistogram;
