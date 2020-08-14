import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import MuiAlert from '@material-ui/lab/Alert';
import React, {useState, useEffect} from 'react';
import {api} from '../../../client';
import {ChartContainer} from './elements';
import {ResponsiveBar} from '@nivo/bar';
import {Typography, Snackbar} from '@material-ui/core';


const TopWebsitesWithMixedContent = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [snackOpen, setSnackOpen] = useState(false);


  useEffect(() => {
    api
        .get('/api/mixed-content/top'+
        '-websites-with-mixed-content')
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
        Top websites with more mixed content
        </Typography>
        <Typography paragraph={true}>
        Websites that contain more mixed content
        </Typography>
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
        <Typography paragraph={true}>
        These are the percentages of mixed content of
          all content from the websites above.
        </Typography>
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
      <Snackbar open={snackOpen} autoHideDuration={6000} onClose={handleClose}>
        <MuiAlert elevation={6} variant="filled"
          onClose={handleClose} severity="error">
          Could not load chart
        </MuiAlert>
      </Snackbar>
    </Card>
  );
};

export default TopWebsitesWithMixedContent;
