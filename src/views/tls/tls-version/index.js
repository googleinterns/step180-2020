import {api} from 'client';
import Card from '@material-ui/core/Card';
import {CardContent} from '@material-ui/core';
import CardHeader from '@material-ui/core/CardHeader';
import {ChartContainer} from './elements';
import CircularProgress from '@material-ui/core/CircularProgress';
import MuiAlert from '@material-ui/lab/Alert';
import Paper from '@material-ui/core/Paper';
import {ResponsivePie} from '@nivo/pie';
import Snackbar from '@material-ui/core/Snackbar';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import React, {useEffect, useState} from 'react';

/**
 * This component shows a pie chart with the number of requests
 * per TLS version in the sample data requests table.
 *
 * @return {ReactNode} TLS versions component
 */
const TLSversion = () => {
  const [loading, setLoading] = useState(true);
  const [snackOpen, setSnackOpen] = useState(false);
  const [data, setData] = useState([]);
  const [table, setTable] = useState('httparchive.sample_data.requests_desktop_10k');

  useEffect(() => {
    setLoading(true);
    api
      .get('/api/tls/tls-version?table=' + table)
      .then((response) => {
        setLoading(false);
        setData(response.data.result);
      })
      .catch((err) => {
        setSnackOpen(true);
      });
  }, [table]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackOpen(false);
  };

  return (
    <>
      <Card data-testid="tls-versions-card">
        <CardHeader
          title="TLS versions"
          subheader="Number of requests by TLS version"
        />
        <Paper square>
          <Tabs
            value={table}
            indicatorColor="primary"
            textColor="primary"
            onChange={(_, newValue) => setTable(newValue)}
          >
            
            <Tab
              data-testid="10k-tab"
              value="httparchive.sample_data.requests_desktop_10k"
              label="10k sample set"
            />
            <Tab
              data-testid="sample-tab"
              value="httparchive.smaller_sample_requests"
              label="Small sample sets"
            />
          </Tabs>
        </Paper>
        <CardContent>
          {!loading ? (
            <ChartContainer data-testid="tls-versions-chart">
              <ResponsivePie
                data={data}
                margin={{top: 40, right: 80, bottom: 80, left: 80}}
                innerRadius={0.5}
                padAngle={0.7}
                cornerRadius={3}
                colors={{scheme: 'category10'}}
                animate={true}
              />
            </ChartContainer>
          ) : (
            <ChartContainer>
              <CircularProgress data-testid="chart-loader" />
            </ChartContainer>
          )}
          
        </CardContent>
      </Card>
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
    </>
  );
};

export default TLSversion;
