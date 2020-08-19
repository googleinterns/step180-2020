import {api} from '../../../client';
import Card from '@material-ui/core/Card';
import {CardContent} from '@material-ui/core';
import {ChartContainer} from '../../chart-container';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import React, {useEffect, useState} from 'react';
import {ResponsivePie} from '@nivo/pie';
import Select from '@material-ui/core/Select';
import {SelectContainer} from '../../select-container';
import Typography from '@material-ui/core/Typography';

/**
 * This component shows a pie chart with the percentage of different
 * certificates used in the key exchange
 *
 * @return {ReactNode} Key exchange component
 */
const KeyExchange = () => {
  const [data, setData] = useState([]);
  const [table, setTable] = useState('httparchive.smaller_sample_requests');
  useEffect(() => {
    api.get('/api/tls/key-exchange?table='+table).then((response) => {
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
        <Typography variant="h3">Key Exchange Certificates</Typography>
        <Typography paragraph={true}
        >Percentage of the different certificates used in key exchange
        </Typography>
        <SelectContainer>
          <FormControl>
            <Select
              value={table}
              onChange={handleChange}
            >
              <MenuItem
                value={'httparchive.smaller_sample_requests'}
              >Small sample set</MenuItem>
              <MenuItem
                value={'httparchive.sample_data.requests_desktop_10k'}
              >10k sample set</MenuItem>
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
            sortByValue={false}
            radialLabel={(d)=>(d.id==='') ? 'Empty' : d.id}
            enableSlicesLabels={false}
            startAngle={-350}
          />
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default KeyExchange;
