import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import MuiAlert from '@material-ui/lab/Alert';
import React, {useState, useEffect} from 'react';
import {api} from '../../../client';
import {ChartContainer} from './elements';
import {ResponsiveBar} from '@nivo/bar';
import {Typography, Snackbar} from '@material-ui/core';


const MixedContentPercentageHistogram = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [snackOpen, setSnackOpen] = useState(false);

  useEffect(() => {
    api
        .get('/api/mixed-content/mixed-content-percentage-histogram')
        .then((response) => {
          setData(response.data.result);
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
          Mixed content percentage
        </Typography>
        <Typography paragraph={true}>
          Histogram of the percentage of mixed content of all websites.
        </Typography>
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
      <Snackbar open={snackOpen} autoHideDuration={6000} onClose={handleClose}>
        <MuiAlert elevation={6} variant="filled"
          onClose={handleClose} severity="error">
          Could not load chart
        </MuiAlert>
      </Snackbar>
    </Card>
  );
};

export default MixedContentPercentageHistogram;
