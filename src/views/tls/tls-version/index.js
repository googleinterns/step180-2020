import Card from '@material-ui/core/Card';
import {CardContent} from '@material-ui/core';
import React, {useEffect, useState} from 'react';
import {api} from '../../../client';
import {ResponsivePie} from '@nivo/pie';
import {ChartContainer} from '../../chart-container';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {SelectContainer} from '../../select-container';

/**
 * This component shows a pie chart with the number of requests
 * per TLS version in the sample data requests table.
 *
 * @return {ReactNode} TLS versions component
 */
const TLSversion = () => {
  const [data, setData] = useState([]);
  const [table, setTable] = useState('httparchive.smaller_sample_requests');
  useEffect(() => {
    api.get('/api/tls/tls-version?table='+table).then((response) => {
      setData(response.data.result);
    }).catch((err) => {
      console.log(err);
    });
  }, [table]);
  const handleChange = (event) => {
    setTable(event.target.value);
  };
  return (
    <Card>
      <CardContent>
        <h1>TLS versions</h1>
        <p>Number of requests by TLS version</p>
        <SelectContainer>
          <FormControl>
            <Select
              value={table}
              onChange={handleChange}
            >
              <MenuItem
                value={'httparchive.smaller_sample_requests'}
              >Table 1</MenuItem>
              <MenuItem
                value={'httparchive.sample_data.requests_desktop_10k'}
              >Table 2</MenuItem>
            </Select>
          </FormControl>
        </SelectContainer>
        <ChartContainer>
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
      </CardContent>
    </Card>
  );
};

export default TLSversion;
