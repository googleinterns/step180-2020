import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CircularProgress from '@material-ui/core/CircularProgress';
import MuiAlert from '@material-ui/lab/Alert';
import React, {useState, useEffect} from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {api} from 'client';
import {ChartContainer, SkeletonContainer} from './elements';
import {ResponsiveBar} from '@nivo/bar';
import {Snackbar} from '@material-ui/core';

const TopGovernmentWebsitesWithMixedContent = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [snackOpen, setSnackOpen] = useState(false);

  useEffect(() => {
    api
      .get('/api/mixed-content/top-government-websites-with-mixed-content')
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
    <>
      <Card data-testid="top-government-websites-with-mixed-content-card">
        <CardHeader
          title="Top government websites with more mixed content"
          subheader="HTTPS Government Websites that have
          the most resources loaded with http."
        />
        <CardContent>
          {!loading ? (
            <ChartContainer data-testid="top-government-websites-with-mixed-content-chart">
              <ResponsiveBar
                data={data}
                colors={{scheme: 'accent'}}
                colorBy="index"
                keys={['mixed_content_resources']}
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
            </ChartContainer>
          ) : (
            <ChartContainer>
              <CircularProgress data-testid="chart-loader" />
            </ChartContainer>
          )}
          {loading ? (
            <SkeletonContainer data-testid="table-skeletons">
              <Skeleton height={40} />
              <Skeleton height={40} />
              <Skeleton height={40} />
              <Skeleton height={40} />
              <Skeleton height={40} />
              <Skeleton height={40} />
              <Skeleton height={40} />
              <Skeleton height={40} />
            </SkeletonContainer>
          ) : (
            <TableContainer data-testid="mixed-content-government-sites-table">
              <Table size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <TableCell>URL</TableCell>
                    <TableCell>Total of mixed content resources</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map(
                    ({mixed_content_resources: mixedContentResources, url}) => (
                      <TableRow key={url}>
                        <TableCell>{url}</TableCell>
                        <TableCell>{mixedContentResources}</TableCell>
                      </TableRow>
                    ),
                  )}
                </TableBody>
              </Table>
            </TableContainer>
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

export default TopGovernmentWebsitesWithMixedContent;
