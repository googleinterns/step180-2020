import Card from '@material-ui/core/Card';
import {CardContent} from '@material-ui/core';
import React, {useEffect, useState} from 'react';
import {api} from '../../../client';
import {ResponsivePie} from '@nivo/pie';
import {ChartContainer} from '../../chart-container';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {SelectContainer} from '../../select-container';

/**
 * This component shows a pie chart with the percentage of mixed
 * content by types
 *
 * @return {ReactNode} TLS versions component
 */
const MixedContentByType = () => {
  const [data, setData] = useState([]);
  const [type, setType] = useState('all');
  useEffect(() => {
    api.get('/api/mixed-content/mixed-content-by-type?type='+type).then((response) => {
      setData(response.data.result);
    }).catch((err) => {
      console.log(err);
    });
  }, [type]);
  const handleChange = (event) => {
    setType(event.target.value);
  };
  return (
    <Card>
      <CardContent>
        <Typography variant="h5">Mixed Content By Type</Typography>
        <SelectContainer>
          <FormControl>
            <Select
              value={type}
              onChange={handleChange}
            >
              <MenuItem
                value={'all'}
              >All types</MenuItem>
              <MenuItem
                value={'image'}
              >Images</MenuItem>
              <MenuItem
                value={'font'}
              >Font</MenuItem>
              <MenuItem
                value={'text'}
              >Text</MenuItem>
              <MenuItem
                value={'application'}
              >Application</MenuItem>
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

export default MixedContentByType;
