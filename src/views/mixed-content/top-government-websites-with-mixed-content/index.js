import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import MuiAlert from '@material-ui/lab/Alert';
import React, {useState, useEffect} from 'react';
import {api} from '../../../client';
import {ChartContainer} from './elements';
import {ResponsiveBar} from '@nivo/bar';
import {Typography, Snackbar} from '@material-ui/core';


const TopGovernmentWebsitesWithMixedContent = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [snackOpen, setSnackOpen] = useState(false);


  useEffect(() => {
    api
        .get('/api/mixed-content/top-government'+
        '-websites-with-mixed-content')
        .then((response) => {
          setData(response.data.result);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
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
        Top government websites with more mixed content
        </Typography>
        <Typography paragraph={true}>
        HTTPS Government Websites that have
          the most resources loaded with http.
        </Typography>
        <ChartContainer>
          {!loading ? (
            <ResponsiveBar
              data={data}
              colors={{scheme: 'accent'}}
              colorBy='index'
              keys={[
                'mixed_content_resources',
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

export default TopGovernmentWebsitesWithMixedContent;
