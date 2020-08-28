import {api} from 'client';
import Card from '@material-ui/core/Card';
import {CardContent} from '@material-ui/core';
import CardHeader from '@material-ui/core/CardHeader';
import ChartContainer from 'common/chart-container';
import CircularProgress from '@material-ui/core/CircularProgress';
import image from './empty-state.png';
import MenuItem from '@material-ui/core/MenuItem';
import MuiAlert from '@material-ui/lab/Alert';
import Paper from '@material-ui/core/Paper';
import {ResponsivePie} from '@nivo/pie';
import Select from '@material-ui/core/Select';
import Snackbar from '@material-ui/core/Snackbar';
import {StyledCardMedia} from './elements';
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
  const [empty, setEmpty] = useState(false);
  const [snackOpen, setSnackOpen] = useState(false);
  const [data, setData] = useState([]);
  const [year, setYear] = useState('sample');
  const [month, setMonth] = useState('01');
  const months = [
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
  ];

  useEffect(() => {
    setLoading(true);
    api
      .get('/api/tls/tls-version?year=' + year + '&month=' + month)
      .then((response) => {
        setLoading(false);
        setData(response.data.result);
        if (response.data.result.length < 1) {
          setEmpty(true);
        } else {
          setEmpty(false);
        }
      })
      .catch((err) => {
        setSnackOpen(true);
      });
  }, [year, month]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackOpen(false);
  };
  const changeMonth = (event) => {
    setMonth(event.target.value);
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
            value={year}
            indicatorColor="primary"
            onChange={(_, newValue) => setYear(newValue)}
          >
            <Tab data-testid="sample-tab" value="sample" label="Sample Data" />
            <Tab data-testid="2018" value="2018" label="2018" />
            <Tab data-testid="2019" value="2019" label="2019" />
            <Tab data-testid="2020" value="2020" label="2020" />
          </Tabs>
          <Select value={month} onChange={changeMonth}>
            {months.map((color, index) => (
              <MenuItem key={index} value={color}>
                {color}
              </MenuItem>
            ))}
          </Select>
        </Paper>
        <CardContent>
          {!loading ? (
            empty ? (
              <ChartContainer>
                <StyledCardMedia component="img" src={image}></StyledCardMedia>
              </ChartContainer>
            ) : (
              <ChartContainer data-testid="tls-versions-chart">
                <ResponsivePie
                  data={data}
                  enableSlicesLabels={false}
                  margin={{top: 40, right: 80, bottom: 80, left: 80}}
                  innerRadius={0.5}
                  padAngle={0.7}
                  cornerRadius={3}
                  colors={{scheme: 'nivo'}}
                  animate={true}
                />
              </ChartContainer>
            )
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
