import { useEffect, useState } from 'react';

interface AutocompleteAsyncProps {
  displayName: string;
  lookupDetails: {
    action: string;
    parameterdetails: string;
  };
}

interface Option {
  display: string;
  value: string;
}

const AutocompleteAsync: React.FC<AutocompleteAsyncProps> = ({
  displayName,
  lookupDetails,
}) => {
  const [options, setOptions] = useState<Option[]>([]);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        // Perform the fetch using lookupDetails.action and lookupDetails.parameterdetails
        const response = await fetch(
          `YOUR_API_ENDPOINT?action=${lookupDetails.action}&parameterdetails=${lookupDetails.parameterdetails}`
        );
        const data = await response.json();
        setOptions(data);
      } catch (error) {
        console.error('Error fetching options:', error);
      }
    };

    fetchOptions();
  }, [lookupDetails]); // Run the effect only when lookupDetails change

  return (
    <Autocomplete
      options={options}
      getOptionLabel={(option) => option.display}
      renderInput={(params) => <TextField {...params} label={displayName} fullWidth />}
    />
  );
};

//this anotherversion


interface AutocompleteAsyncProps {
    displayName: string;
    lookupDetails: {
      action: string;
      parameterdetails: string;
    };
  }
  
  interface Option {
    display: string;
    value: string;
  }
  
  const AutocompleteAsync: React.FC<AutocompleteAsyncProps> = ({
    displayName,
    lookupDetails,
  }) => {
    const [options, setOptions] = useState<Option[]>([]);
  
    const fetchOptions = async () => {
      try {
        // Perform the fetch using lookupDetails.action and lookupDetails.parameterdetails
        const response = await fetch(
          `YOUR_API_ENDPOINT?action=${lookupDetails.action}&parameterdetails=${lookupDetails.parameterdetails}`
        );
        const data = await response.json();
        setOptions(data);
      } catch (error) {
        console.error('Error fetching options:', error);
      }
    };
  
    return (
      <Autocomplete
        options={options}
        getOptionLabel={(option) => option.display}
        renderInput={(params) => <TextField {...params} label={displayName} fullWidth />}
        onInputChange={(_, value) => {
          if (value) {
            fetchOptions();
          } else {
            setOptions([]);
          }
        }}
      />
    );
  };

  
//mainfile

import { useState } from 'react';

<Grid item xs={2}>
  {data.map((item, index) => (
    <div key={index}>
      <p>{item.displayName}</p>
      {item.datatype === 'string' && (
        <AutocompleteAsync
          displayName={item.displayName}
          lookupDetails={item.lookupdetailsvo}
        />
      )}
      {/* Render other form elements based on the datatype */}
    </div>
  ))}
</Grid>


<Grid item xs={2}>
  {data.map((item, index) => (
    <div key={index}>
      <p>{item.displayName}</p>
      {item.datatype === 'string' && (
        <Autocomplete
          options={item.lookupdetailsvo.lookupvalues}
          getOptionLabel={(option) => option.display}
          renderInput={(params) => <TextField {...params} label={item.displayName} fullWidth />}
        />
      )}
      {/* Render other form elements based on the datatype */}
    </div>
  ))}
</Grid>


const BasicTabPage: React.FC<BasicTabPageProps> = ({ data }) => {
    // Separate the data into date and datetime ranges
    const dateData = data.filter((item) => item.datatype === 'date');
    const dateTimeData = data.filter((item) => item.datatype === 'datetime');
  
    return (
      <Grid container spacing={2}>
        {/* Render the text fields and dropdowns */}
        <Grid item xs={12}>
          <Grid container spacing={2}>
            {data.map((item, index) => (
              <Grid item xs={2} key={index}>
                <div>
                  <p>{item.displayName}</p>
                  {item.datatype === 'string' && (
                    <TextField label={item.displayName} fullWidth />
                  )}
                  {/* Render other form elements based on the datatype */}
                </div>
              </Grid>
            ))}
          </Grid>
        </Grid>
  
        {/* Add a divider */}
        <Grid item xs={12}>
          <Divider />
        </Grid>
  
        {/* Render the date and datetime range pickers */}
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              {dateData.map((item, index) => (
                <div key={index}>
                  <p>{item.displayName}</p>
                  <TextField
                    label={item.displayName}
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                  />
                </div>
              ))}
            </Grid>
            <Grid item xs={6}>
              {dateTimeData.map((item, index) => (
                <div key={index}>
                  <p>{item.displayName}</p>
                  <TextField
                    label={item.displayName}
                    type="datetime-local"
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                  />
                </div>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  };
<Grid item xs={2}>
  {data.map((item, index) => (
    <div key={index}>
      <p>{item.displayName}</p>
      {item.datatype === 'string' && (
        <TextField label={item.displayName} fullWidth />
      )}
      {item.datatype === 'date' && (
        <TextField
          label={item.displayName}
          type="date"
          InputLabelProps={{ shrink: true }}
          fullWidth
        />
      )}
      {item.datatype === 'datetime' && (
        <TextField
          label={item.displayName}
          type="datetime-local"
          InputLabelProps={{ shrink: true }}
          fullWidth
        />
      )}
      {/* Render other form elements based on the datatype */}
    </div>
  ))}
</Grid>


