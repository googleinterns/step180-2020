import {api} from 'client';
import Card from '@material-ui/core/Card';
import {CardContent, NativeSelect, useScrollTrigger} from '@material-ui/core';
import CardHeader from '@material-ui/core/CardHeader';
import ChartContainer from 'common/chart-container';
import CircularProgress from '@material-ui/core/CircularProgress';
import MuiAlert from '@material-ui/lab/Alert';
import Paper from '@material-ui/core/Paper';
import {ResponsivePie} from '@nivo/pie';
import Snackbar from '@material-ui/core/Snackbar';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import React, {useEffect, useState} from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';

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
  const [table, setTable] = useState('httparchive.smaller_sample_requests');
  const [year, setYear] = useState('sample');
  const [month, setMonth] = useState('01');
  const [months, setMonths] = useState([
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
  ]);
  const [url, setUrl] = useState('');
  useEffect(() => {
    setUrl(
      '/api/tls/tls-version?table=' +
        table +
        '&year=' +
        year +
        '&month=' +
        month,
    );
    console.log(url);
    setLoading(true);
    api
      .get(
        '/api/tls/tls-version?table=' +
          table +
          '&year=' +
          year +
          '&month=' +
          month,
      )
      .then((response) => {
        setLoading(false);
        setData(response.data.result);
      })
      .catch((err) => {
        setSnackOpen(true);
      });
    if (year === '2018') {
      setMonths(['04', '05', '06', '07', '08', '09', '10', '11', '12']);
    } else {
      setMonths([
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
      ]);
    }
  }, [table, year, month]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackOpen(false);
  };
  const handleChange = (event) => {
    setYear(event.target.value);
    console.log(year);
  };
  const changeMonth = (event) => {
    setMonth(event.target.value);
    console.log('month');
    console.log(month);
    console.log('value');
    console.log(event.target.value);
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
              data-testid="sample-tab"
              value="httparchive.smaller_sample_requests"
              label="Small sample sets"
            />
            <Tab
              data-testid="10k-tab"
              value="httparchive.sample_data.requests_desktop_10k"
              label="10k sample set"
            />
          </Tabs>
          <Tabs
            value={year}
            indicatorColor="primary"
            onChange={(_, newValue) => setYear(newValue)}
          >
            <Tab value="sample" label="Sample Data" />
            <Tab value="2018" label="2018" />
            <Tab value="2019" label="2019" />
            <Tab value="2020" label="2020" />
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
            <ChartContainer data-testid="tls-versions-chart">
              <ResponsivePie
                data={data}
                margin={{top: 40, right: 80, bottom: 80, left: 80}}
                innerRadius={0.5}
                padAngle={0.7}
                cornerRadius={3}
                colors={{scheme: 'nivo'}}
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

/**
 * 
          <FormControl>
            <Select name={month}
            onChange = {changeMonth}>
              {months.map(m =>
              <MenuItem key={m.key} value={m.key}>{m}</MenuItem>
            )};
            {console.log(months.map((m,index)=>index))}
            </Select>
          </FormControl>
 */
export default TLSversion;
