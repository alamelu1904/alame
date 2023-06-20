import { useState, useEffect } from 'react';
import { Grid, TextField, Select, MenuItem } from '@mui/material';

const YourComponent = () => {
  const [options, setOptions] = useState<any[]>([]);
  const childfrmdetails: any[] = []; // Update with your actual data

  useEffect(() => {
    childfrmdetails.forEach(async (field) => {
      const { datatype, lookupdetailsvo } = field;

      if (lookupdetailsvo && lookupdetailsvo.customlookup && lookupdetailsvo.paramdet) {
        try {
          const response = await fetch('your_api_endpoint', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              action: lookupdetailsvo.action,
              parameterdetails: lookupdetailsvo.parameterdetails,
              appid: bltrobj['appid'],
            }),
          });

          const data = await response.json();
          if (Array.isArray(data)) {
            setOptions(data);
          }
        } catch (error) {
          console.error('Error fetching options:', error);
        }
      } else if (lookupdetailsvo && lookupdetailsvo.lookupvalues && lookupdetailsvo.lookupvalues.length > 0) {
        setOptions(lookupdetailsvo.lookupvalues);
      }
    });
  }, [childfrmdetails]);

  const renderFieldComponent = (field: any) => {
    const { datatype, lookupdetailsvo } = field;

    if (lookupdetailsvo && lookupdetailsvo.customlookup && lookupdetailsvo.paramdet) {
      return (
        <Grid item>
          <Select label={field.displayname}>
            {options.map((lookupValue: any, lookupIndex: number) => (
              <MenuItem key={lookupIndex} value={lookupValue.value}>
                {lookupValue.display}
              </MenuItem>
            ))}
          </Select>
        </Grid>
      );
    } else if (lookupdetailsvo && lookupdetailsvo.lookupvalues && lookupdetailsvo.lookupvalues.length > 0) {
      return (
        <Grid item>
          <Select label={field.displayname}>
            {options.map((lookupValue: any, lookupIndex: number) => (
              <MenuItem key={lookupIndex} value={lookupValue.value}>
                {lookupValue.display}
              </MenuItem>
            ))}
          </Select>
        </Grid>
      );
    } else {
      return (
        <Grid item>
          <TextField label={field.displayname} />
        </Grid>
      );
    }
  };

  return (
    <Grid container>
      {childfrmdetails.map((field, index) => (
        <React.Fragment key={index}>{renderFieldComponent(field)}</React.Fragment>
      ))}
    </Grid>
  );
};
