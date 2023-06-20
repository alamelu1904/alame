import React, { useState, useEffect } from 'react';
import { Grid, TextField, Select, MenuItem, Autocomplete, Button, Divider } from '@mui/material';
import DateTimePicker from '@mui/lab/DateTimePicker';

const YourComponent = (props: any) => {
  const { bltrobj } = props;
  const [schemaData, setSchemaData] = useState<any[]>([]);
  const [options, setOptions] = useState<any[]>([]);
  const [formData, setFormData] = useState<any>({});

  const fetchSchemaData = async () => {
    const { appid, filterdata } = bltrobj;

    try {
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          appid,
          filterdata,
        }),
      });

      const result = await response.json();
      setSchemaData(result);
    } catch (error) {
      console.error('Error fetching schema:', error);
    }
  };

  useEffect(() => {
    fetchSchemaData();
  }, [bltrobj]);

  const fetchOptions = async (lookupvo: any) => {
    const { action, parameterdet } = lookupvo;
    const { appid } = bltrobj;

    try {
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          action,
          parameterdet,
          appid,
        }),
      });

      const result = await response.json();
      setOptions(result);
    } catch (error) {
      console.error('Error fetching options:', error);
    }
  };

  const handleFieldChange = (fieldName: string, value: any) => {
    setFormData((prevData: any) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const handleSubmit = () => {
    // Handle form submission here
    console.log(formData);
  };

  const handleReset = () => {
    // Clear form data
    setFormData({});
  };

  const renderFields = () => {
    return schemaData.map((field: any, index: number) => {
      const { datatype, label, lookupvodetails } = field;

      if (lookupvodetails && lookupvodetails.customfilter) {
        return (
          <Grid item xs={2} key={index}>
            <Autocomplete
              options={options}
              getOptionLabel={(option: any) => option.display}
              renderInput={(params) => <TextField {...params} label={label} fullWidth />}
              onChange={(event, value) => handleFieldChange(field.name, value)}
              onOpen={() => fetchOptions(lookupvodetails)}
            />
          </Grid>
        );
      }

      if (lookupvodetails && lookupvodetails.lookupvalues && lookupvodetails.lookupvalues.length > 0) {
        return (
          <Grid item xs={2} key={index}>
            <Select
              label={label}
              fullWidth
              value={formData[field.name] || ''}
              onChange={(event) => handleFieldChange(field.name, event.target.value)}
            >
              {lookupvodetails.lookupvalues.map((lookupValue: any, lookupIndex: number) => (
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
          <TextField
            label={label}
            fullWidth
            value={formData[field.name] || ''}
            onChange={(event)
