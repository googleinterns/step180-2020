import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CircularProgress from '@material-ui/core/CircularProgress';
import MuiAlert from '@material-ui/lab/Alert';
import Paper from '@material-ui/core/Paper';
import React, {useState, useEffect} from 'react';
import Tab from '@material-ui/core/Tab';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Tabs from '@material-ui/core/Tabs';
import {api} from 'client';
import {ChartContainer, CustomCard} from './elements';
import {ResponsiveBar} from '@nivo/bar';
import {Snackbar} from '@material-ui/core';

const TopWebsitesWithMixedContent = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [snackOpen, setSnackOpen] = useState(false);
  const [tab, setTab] = React.useState(0);

  useEffect(() => {
    api
      .get('/api/mixed-content/top-websites-with-mixed-content')
      .then((response) => {
        setData(
          response.data.result.map((website) => ({
            ...website,
            mixed_percentage: Number(
              (website.mixed_percentage * 100).toFixed(2),
            ),
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
    <>
      <CustomCard data-testid="top-websites-with-mixed-content-card">
        <CardHeader
          title="Top websites with more mixed content"
          subheader="Websites with the greatest amount of mixed content
          resources. You can check both the percentage of mixed resources
          across the page or the total amount of mixed content resources"
        />
        <Paper square>
          <Tabs
            value={tab}
            indicatorColor="primary"
            textColor="primary"
            onChange={(_, newValue) => setTab(newValue)}
          >
            <Tab label="% of resources" />
            <Tab label="Total of resources" />
          </Tabs>
        </Paper>
        <CardContent>
          {!loading ? (
            <>
              {tab === 0 && (
                <ChartContainer data-testid="mixed-percentage-chart">
                  <ResponsiveBar
                    data={data}
                    colors={{scheme: 'accent'}}
                    colorBy="index"
                    keys={['mixed_percentage']}
                    indexBy="url"
                    axisLeft={{
                      legend: 'Total of mixed content resources',
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
                </ChartContainer>
              )}
              {tab === 1 && (
                <ChartContainer data-testid="mixed-reqs-total-chart">
                  <ResponsiveBar
                    data={data}
                    colors={{scheme: 'accent'}}
                    colorBy="index"
                    keys={['mixed_reqs_total']}
                    indexBy="url"
                    axisLeft={{
                      legend: '% of mixed content resources',
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
                </ChartContainer>
              )}
            </>
          ) : (
            <ChartContainer>
              <CircularProgress data-testid="chart-loader" />
            </ChartContainer>
          )}
        </CardContent>
        <Snackbar
          open={snackOpen}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <MuiAlert
            elevation={6}
            variant="filled"
            onClose={handleClose}
            severity="error"
          >
            Could not load chart
          </MuiAlert>
        </Snackbar>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>URL</TableCell>
                <TableCell>% of mixed content resources</TableCell>
                <TableCell>Total of mixed content resources</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map(
                ({
                  mixed_percentage: mixedPercentage,
                  mixed_reqs_total: mixedReqsTotal,
                  url,
                }) => (
                  <TableRow key={url}>
                    <TableCell>{url}</TableCell>
                    <TableCell>{mixedPercentage}</TableCell>
                    <TableCell>{mixedReqsTotal}</TableCell>
                  </TableRow>
                ),
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </CustomCard>
    </>
  );
};

export default TopWebsitesWithMixedContent;
