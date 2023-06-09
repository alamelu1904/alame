import { useState, useEffect } from 'react';
import { Grid, TextField, Select, MenuItem } from '@mui/material';

const YourComponent = () => {
  const [options, setOptions] = useState<any[]>([]);
  const childfrmdetails: any[] = []; // Update with your actual data

  useEffect(() => {
    childfrmdetails.forEach((field) => {
      const { datatype, lookupdetailsvo } = field;

      if (lookupdetailsvo && lookupdetailsvo.customlookup && lookupdetailsvo.paramdet) {
        setOptions(lookupdetailsvo.lookupvalues);
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
