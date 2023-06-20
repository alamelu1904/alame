import { useState, useEffect } from 'react';
import { Grid, TextField, Select, MenuItem } from '@mui/material';

const YourComponent = (bltrobj) => {
  const [options, setOptions] = useState<any[]>([]);
  const childfrmdetails: any[] = []; // Update with your actual data

  useEffect(() => {
    fetchschemajson();
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
  },[bltrobj['appid'],bltrobj['filtertype'], childfrmdetails]);
  const renderFields =(schemaDAta)=>{
    if(!schemaDAta)
    return null;
    const totalElements = schemaDAta.length;
    const itemsPerColumn = Math.ceil(totalElements/6);
    const columns = Array.from({ length: 6 }, (_, i) => {
        const startIndex = i * itemsPerColumn;
        const endIndex = Math.min((i + 1) * itemsPerColumn, totalElements);
  
        return childfrmdetails.slice(startIndex, endIndex).map((field: any, index: number) => {
          const { datatype, lookupdetailsvo } = field;
  
          const [options, setOptions] = useState<any[]>([]);
  
          useEffect(() => {
            if (lookupdetailsvo && lookupdetailsvo.paramdet) {
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
          }, []);
  
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
  }

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
