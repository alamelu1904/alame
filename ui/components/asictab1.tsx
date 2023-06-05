import { useState, useEffect } from 'react';
import { Grid, TextField, Select, MenuItem, Autocomplete } from '@mui/material';

// ...

const renderFields = () => {
  const totalElements = childfrmdetails.length;
  const itemsPerColumn = Math.ceil(totalElements / 6); // Calculate the number of items per column

  const columns = Array.from({ length: 6 }, (_, i) => {
    const startIndex = i * itemsPerColumn;
    const endIndex = Math.min((i + 1) * itemsPerColumn, totalElements);

    return childfrmdetails.slice(startIndex, endIndex).map((field: any, index: number) => {
      const { datatype, lookupdetailsvo } = field;

      const [options, setOptions] = useState<any[]>([]); // State to store the options

      useEffect(() => {
        if (lookupdetailsvo && lookupdetailsvo.paramdet) {
          // Perform fetch call using lookupdetailsvo.action, lookupdetailsvo.paramdet, applicid
          fetchLookupOptions(lookupdetailsvo.action, lookupdetailsvo.paramdet, applicid)
            .then((fetchedOptions) => {
              setOptions(fetchedOptions);
            })
            .catch((error) => {
              console.error('Error fetching lookup options:', error);
            });
        } else if (lookupdetailsvo && lookupdetailsvo.lookupvalues) {
          setOptions(lookupdetailsvo.lookupvalues);
        }
      }, []); // Empty dependency array to run the effect only once during component initialization

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

      if (datatype === 'string' || datatype === 'double' || datatype === 'int') {
        return (
          <Grid item xs={2} key={index}>
            <TextField label={field.label} fullWidth />
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

  return (
    <Grid container spacing={2}>
      {columns.map((column, index) => (
        <Grid item xs={2} key={index}>
          {column}
        </Grid>
      ))}
    </Grid>
  );
};

// ...
