import {api} from 'client';
import Card from '@material-ui/core/Card';
import {CardContent} from '@material-ui/core';
import CardHeader from '@material-ui/core/CardHeader';
import ChartContainer from 'common/chart-container';
import CircularProgress from '@material-ui/core/CircularProgress';
import MuiAlert from '@material-ui/lab/Alert';
import Paper from '@material-ui/core/Paper';
import {ResponsivePie} from '@nivo/pie';
import {Snackbar} from '@material-ui/core';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import React, {useEffect, useState} from 'react';

/**
 * Returns a pie chart with the percentage of mixed content by types
 *
 * @return {ReactNode} Mixed content types component
 */
const MixedContentByType = () => {
  const [loading, setLoading] = useState(true);
  const [snackOpen, setSnackOpen] = useState(false);
  const [data, setData] = useState([]);
  const [type, setType] = useState('all');

  useEffect(() => {
    setLoading(true);
    api
      .get('/api/mixed-content/mixed-content-by-type?type=' + type)
      .then((response) => {
        setData(response.data.result);
        setLoading(false);
      })
      .catch((err) => {
        setSnackOpen(true);
      });
  }, [type]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackOpen(false);
  };

  return (
    <>
      <Card data-testid="mixed-content-by-type-card">
        <CardHeader
          title="Mixed Content By Type"
          subheader="There are many different types of mixed content across the web. Unfortunately a big chunk is active mixed content."
        />
        <Paper square>
          <Tabs
            value={type}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
            onChange={(_, newValue) => setType(newValue)}
          >
            <Tab data-testid="all-tab" value="all" label="All types" />
            <Tab data-testid="image-tab" value="image" label="Images" />
            <Tab data-testid="font-tab" value="font" label="Font" />
            <Tab data-testid="text-tab" value="text" label="Text" />
            <Tab
              data-testid="application-tab"
              value="application"
              label="Application"
            />
          </Tabs>
        </Paper>
        <CardContent>
          {!loading ? (
            <ChartContainer data-testid="mixed-content-by-type-chart">
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

export default MixedContentByType;
