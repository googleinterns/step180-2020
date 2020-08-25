import * as features from '../features.json';
import {api} from '../../../../client';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CircularProgress from '@material-ui/core/CircularProgress';
import MuiAlert from '@material-ui/lab/Alert';
import {ResponsiveChoropleth} from '@nivo/geo';
import Skeleton from '@material-ui/lab/Skeleton';
import {Snackbar} from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {ChartContainer, CustomCard, SkeletonContainer} from './elements';
import React, {useEffect, useState} from 'react';

const TopCountriesWithMoreWebsitesWithMixedContentAdjusted = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [snackOpen, setSnackOpen] = useState(false);

  useEffect(() => {
    api
      .get(
        '/api/mixed-content/top-countries' +
          '-with-more-government-websites-with-mixed-content-adjusted',
      )
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
      <CustomCard data-testid="top-countries-with-more-websites-more-government-with-mixed-content-adjusted-card">
        <CardHeader
          title="Percentage of government websites with mixed content"
          subheader="This shows how many government websites have mixed content relative to their total government websites."
        />
        <CardContent>
          {!loading ? (
            <ChartContainer
              data-testid="
                top-countries-with-more-websites-more-government-with-mixed-content-adjusted-chart
              "
            >
              <ResponsiveChoropleth
                data={data}
                features={features.features}
                margin={{top: 0, right: 0, bottom: 0, left: 0}}
                colors="greens"
                domain={[0, 100]}
                unknownColor="#666666"
                label="properties.name"
                valueFormat=".2s"
                projectionTranslation={[0.5, 0.5]}
                projectionRotation={[0, 0, 0]}
                enableGraticule={true}
                graticuleLineColor="#dddddd"
                borderWidth={0.5}
                borderColor="#152538"
                axisBottom={{
                  tickSize: 5,
                  tickPadding: 5,
                  legend: 'Countries',
                  legendPosition: 'middle',
                  legendOffset: 32,
                }}
                legends={[
                  {
                    anchor: 'bottom-left',
                    direction: 'row',
                    justify: true,
                    translateX: 10,
                    translateY: 0,
                    itemsSpacing: 12,
                    itemWidth: 40,
                    itemHeight: 18,
                    itemDirection: 'top-to-bottom',
                    itemTextColor: '#444444',
                    itemOpacity: 0.85,
                    symbolSize: 10,
                    effects: [
                      {
                        on: 'hover',
                        style: {
                          itemTextColor: '#000000',
                          itemOpacity: 1,
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
            <TableContainer>
              <Table size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <TableCell>Country</TableCell>
                    <TableCell>
                      % Government websites with mixed content
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data
                    .map(({id, value}) => (
                      <TableRow key={id}>
                        <TableCell>{id}</TableCell>
                        <TableCell>{value}</TableCell>
                      </TableRow>
                    ))
                    .slice(0, 10)}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </CardContent>
      </CustomCard>
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

export default TopCountriesWithMoreWebsitesWithMixedContentAdjusted;
