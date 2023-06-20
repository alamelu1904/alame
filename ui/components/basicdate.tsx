import { useState, useEffect } from 'react';
import { Grid, TextField, Select, MenuItem, Divider } from '@mui/material';
import { Autocomplete, DateTimePicker, DateRangePicker } from '@mui/lab';

const YourComponent = (bltrobj: any) => {
  const [options, setOptions] = useState<any[]>([]);
  const [schemaData, setSchemaData] = useState<any[]>([]);
  const [renderedFields, setRenderedFields] = useState<JSX.Element[]>([]);

  const fetchSchemaJson = () => {
    fetch(url, { method: 'post' })
      .then((res) => res.json())
      .then((result) => {
        const schemaData = result;
        setSchemaData(schemaData);
        setRenderedFields(renderFields(schemaData));
      })
      .catch((error) => {
        console.error('Error fetching schema:', error);
      });
  };

  useEffect(() => {
    fetchSchemaJson();
  }, [bltrobj['appid'], bltrobj['filtertype']]);

  const fetchLookupOptions = async (action: string, paramdet: string, appid: string) => {
    try {
      const response = await fetch('your_api_endpoint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: action,
          parameterdetails: paramdet,
          appid: appid,
        }),
      });

      const data = await response.json();
      if (Array.isArray(data)) {
        return data;
      }
    } catch (error) {
      console.error('Error fetching options:', error);
    }

    return [];
  };

  const renderFields = (schemaData: any[]) => {
    if (!schemaData) {
      return null;
    }

    const totalElements = schemaData.length;
    const itemsPerColumn = Math.ceil(totalElements / 6);
    const columns = Array.from({ length: 6 }, (_, i) => {
      const startIndex = i * itemsPerColumn;
      const endIndex = Math.min((i + 1) * itemsPerColumn, totalElements);

      return schemaData.slice(startIndex, endIndex).map((field: any, index: number) => {
        const { datatype, lookupdetailsvo } = field;

        if (lookupdetailsvo && lookupdetailsvo.paramdet) {
          return (
            <Grid item xs={2} key={index}>
              <Autocomplete
                options={options}
                getOptionLabel={(option: any) => option.display}
                renderInput={(params) => <TextField {...params} label={field.label} fullWidth />}
              />
            </Grid>
          );
        }

        if (options.length > 0) {
          return (
            <Grid item xs={2} key={index}>
              <Select label={field.label} fullWidth>
                {options.map((lookupValue: any, lookupIndex: number) => (
                  <MenuItem key={lookupIndex} value={lookupValue.value}>
                    {lookupValue.display}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          );
        }

        return (
          <Grid item xs={2} key={index}>
            <TextField label={field.label} fullWidth />
          </Grid>
        );
      });
    });

    return columns;
  };

  const renderDateTimePickers = (schemaData: any[]) => {
    const dateTimeFields = schemaData.filter((field) => field.datatype === 'timestamp');
    const dateRangeFields = schemaData.filter((field) => field.datatype === 'datete');

    return (
      <>
        <Divider />
        <Grid container>
          {dateTimeFields.map((field, index) => (
            <Grid item xs={2} key={index}>
              <DateTimePicker label={field.label} />
            </Grid>
          ))}
          {dateRangeFields.map((field, index) => (
            <Grid item xs={2} key={index}>
              <DateRangePicker label={field.label} />
            </Grid>
          ))}
        </Grid>
      </>
    );
  };

  return (
    <Grid container>
      {renderedFields}
      {renderDateTimePickers(schemaData)}
    </Grid>
  );
};
