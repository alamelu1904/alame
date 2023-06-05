import React, { useState, useEffect } from 'react';
import { Grid, TextField, Select, MenuItem, Autocomplete } from '@mui/material';

const BasicForm: React.FC = () => {
  const [childfrmdetails, setChildfrmdetails] = useState<any[]>([]); // Replace with your initial child form details

  useEffect(() => {
    // Fetch child form details from API or set it directly
    fetchChildFormDetails()
      .then((data) => {
        setChildfrmdetails(data.childfrmdetails);
      })
      .catch((error) => {
        console.error('Error fetching child form details:', error);
      });
  }, []);

  const fetchChildFormDetails = async () => {
    // Fetch child form details from API
    try {
      const response = await fetch('your_api_url');

      if (!response.ok) {
        throw new Error('Error fetching child form details');
      }

      const data = await response.json();

      return data;
    } catch (error) {
      console.error('Error fetching child form details:', error);
      throw error;
    }
  };

  const fetchLookupOptions = async (action: string, paramdet: string, applicid: string) => {
    try {
      const response = await fetch('your_api_url', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action, paramdet, applicid }),
      });

      if (!response.ok) {
        throw new Error('Error fetching lookup options');
      }

      const data = await response.json();

      const options = data.lookupOptions;

      return options;
    } catch (error) {
      console.error('Error fetching lookup options:', error);
      throw error;
    }
  };

  const renderFields = () => {
    const totalElements = childfrmdetails.length;
    const itemsPerColumn = Math.ceil(totalElements / 6);

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

  return (
    <Grid container spacing={2}>
      {renderFields()}
    </Grid>
  );
};

export default BasicForm;
