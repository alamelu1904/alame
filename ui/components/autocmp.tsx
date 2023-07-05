import React, { useState, useEffect } from 'react';
import { Autocomplete, CircularProgress, FormControl, Grid, TextField } from '@material-ui/core';

const YourComponent = ({ lookUpDetailsVO, bltrObj }) => {
  const [selectedValue, setSelectedValue] = useState(null);
  const [lookupOptions, setLookupOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchStatus, setFetchStatus] = useState(false); // Track fetch status

  useEffect(() => {
    if (lookUpDetailsVO && lookUpDetailsVO.customLookup && lookUpDetailsVO.parameterDetails && !fetchStatus) {
      const action = lookUpDetailsVO.action;
      const parameterDetails = lookUpDetailsVO.parameterDetails;
      const appId = bltrObj['appId'];
      fetchLookupData(action, parameterDetails, appId);
    }
  }, [lookUpDetailsVO, bltrObj, fetchStatus]);

  const fetchLookupData = (action, parameterDetails, appId) => {
    setLoading(true);
    // Make your API call here using the action, parameterDetails, and appId parameters
    // Once you have the data, update the lookupOptions state variable
    // Example:
    fetch(`your-api-url?action=${action}&parameterDetails=${parameterDetails}&appId=${appId}`)
      .then(response => response.json())
      .then(data => {
        setLookupOptions(data);
        setLoading(false);
        setFetchStatus(true); // Set fetch status to true after successful fetch
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  };

  const handleFilterOptions = (event, value) => {
    setSelectedValue(value);
    // Perform filtering based on the value
    // Update the lookupOptions state variable with the filtered results
    // Example:
    const filteredOptions = lookupOptions.filter(option => option.name.includes(value));
    setLookupOptions(filteredOptions);
  };

  return (
    <Grid item xs={2}>
      <FormControl fullWidth>
        <Autocomplete
          value={selectedValue}
          options={lookupOptions}
          getOptionLabel={option => option.name}
          onChange={(event, value) => setSelectedValue(value)}
          onOpen={() => {
            if (lookupOptions.length === 0) {
              const action = lookUpDetailsVO.action;
              const parameterDetails = lookUpDetailsVO.parameterDetails;
              const appId = bltrObj['appId'];
              fetchLookupData(action, parameterDetails, appId);
            }
          }}
          renderInput={params => (
            <TextField
              {...params}
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <>
                    {loading && <CircularProgress color="inherit" size={20} />}
                    {params.InputProps.startAdornment}
                  </>
                ),
              }}
              variant="outlined"
              className="autocomplete-input"
            />
          )}
          classes={{
            paper: 'autocomplete-paper',
          }}
        />
      </FormControl>
    </Grid>
  );
};

export default YourComponent;




.autocomplete-input {
    width: 300px; /* Set the desired width for the Autocomplete input field */
    border: 1px solid #ccc; /* Add a border to the input field */
    padding: 5px; /* Add padding to the input field */
  }
  
  .autocomplete-paper {
    max-height: 200px; /* Set the maximum height for the paper */
    width: 300px; /* Set the width for the paper */
    border: 1px solid #ccc; /* Add a border to the paper */
    overflow-y: auto; /* Enable*/

    


    import React, { useState, useEffect } from 'react';
import { Autocomplete, CircularProgress, FormControl, Grid, TextField } from '@material-ui/core';

const YourComponent = ({ lookUpDetailsVO, bltrObj }) => {
  const [selectedValue, setSelectedValue] = useState(null);
  const [lookupOptions, setLookupOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (lookUpDetailsVO && lookUpDetailsVO.customLookup && lookUpDetailsVO.parameterDetails) {
      const action = lookUpDetailsVO.action;
      const parameterDetails = lookUpDetailsVO.parameterDetails;
      const appId = bltrObj['appId'];
      fetchLookupData(action, parameterDetails, appId);
    }
  }, [lookUpDetailsVO, bltrObj]);

  const fetchLookupData = (action, parameterDetails, appId) => {
    setLoading(true);
    // Make your API call here using the action, parameterDetails, and appId parameters
    // Once you have the data, update the lookupOptions state variable
    // Example:
    fetch(`your-api-url?action=${action}&parameterDetails=${parameterDetails}&appId=${appId}`)
      .then(response => response.json())
      .then(data => {
        setLookupOptions(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  };

  const handleFilterOptions = (event, value) => {
    setSelectedValue(value);
    // Perform filtering based on the value
    // Update the lookupOptions state variable with the filtered results
    // Example:
    const filteredOptions = lookupOptions.filter(option => option.name.includes(value));
    setLookupOptions(filteredOptions);
  };

  return (
    <Grid item xs={2}>
      <FormControl fullWidth>
        <Autocomplete
          value={selectedValue}
          options={lookupOptions}
          getOptionLabel={option => option.name}
          onChange={(event, value) => setSelectedValue(value)}
          onOpen={() => {
            if (lookupOptions.length === 0) {
              const action = lookUpDetailsVO.action;
              const parameterDetails = lookUpDetailsVO.parameterDetails;
              const appId = bltrObj['appId'];
              fetchLookupData(action, parameterDetails, appId);
            }
          }}
          renderInput={params => (
            <TextField
              {...params}
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <>
                    {loading && <CircularProgress color="inherit" size={20} />}
                    {params.InputProps.startAdornment}
                  </>
                ),
              }}
              variant="outlined"
              className="autocomplete-input"
            />
          )}
          classes={{
            paper: 'autocomplete-paper', // Add a CSS class for customizing the paper component
          }}
        />
      </FormControl>
    </Grid>
  );
};

export default YourComponent;



import React, { useState, useEffect } from 'react';
import { Autocomplete, CircularProgress, FormControl, Grid, TextField } from '@material-ui/core';

const YourComponent = ({ lookUpDetailsVO, bltrObj }) => {
  const [selectedValue, setSelectedValue] = useState(null);
  const [lookupOptions, setLookupOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (lookUpDetailsVO && lookUpDetailsVO.customLookup && lookUpDetailsVO.parameterDetails) {
      const action = lookUpDetailsVO.action;
      const parameterDetails = lookUpDetailsVO.parameterDetails;
      const appId = bltrObj['appId'];
      fetchLookupData(action, parameterDetails, appId);
    }
  }, [lookUpDetailsVO, bltrObj]);

  const fetchLookupData = (action, parameterDetails, appId) => {
    setLoading(true);
    // Make your API call here using the action, parameterDetails, and appId parameters
    // Once you have the data, update the lookupOptions state variable
    // Example:
    fetch(`your-api-url?action=${action}&parameterDetails=${parameterDetails}&appId=${appId}`)
      .then(response => response.json())
      .then(data => {
        setLookupOptions(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  };

  const handleFilterOptions = (event, value) => {
    setSelectedValue(value);
    // Perform filtering based on the value
    // Update the lookupOptions state variable with the filtered results
    // Example:
    const filteredOptions = lookupOptions.filter(option => option.name.includes(value));
    setLookupOptions(filteredOptions);
  };

  return (
    <Grid item xs={2}>
      <FormControl fullWidth>
        <Autocomplete
          value={selectedValue}
          options={lookupOptions}
          getOptionLabel={option => option.name}
          onChange={(event, value) => setSelectedValue(value)}
          onOpen={() => {
            if (lookupOptions.length === 0) {
              const action = lookUpDetailsVO.action;
              const parameterDetails = lookUpDetailsVO.parameterDetails;
              const appId = bltrObj['appId'];
              fetchLookupData(action, parameterDetails, appId);
            }
          }}
          renderInput={params => (
            <TextField
              {...params}
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <>
                    {loading && <CircularProgress color="inherit" size={20} />}
                    {params.InputProps.startAdornment}
                  </>
                ),
              }}
              variant="outlined"
              className="autocomplete-input"
            />
          )}
          classes={{
            paper: 'autocomplete-paper', // Add a CSS class for customizing the paper component
          }}
        />
      </FormControl>
    </Grid>
  );
};

export default YourComponent;
import React, { useState, useEffect } from 'react';
import { Autocomplete, CircularProgress, FormControl, Grid, TextField } from '@material-ui/core';

const YourComponent = ({ lookUpDetailsVO, bltrObj }) => {
  const [selectedValue, setSelectedValue] = useState(null);
  const [lookupOptions, setLookupOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (lookUpDetailsVO && lookUpDetailsVO.customLookup && lookUpDetailsVO.parameterDetails) {
      const action = lookUpDetailsVO.action;
      const parameterDetails = lookUpDetailsVO.parameterDetails;
      const appId = bltrObj['appId'];
      fetchLookupData(action, parameterDetails, appId);
    }
  }, [lookUpDetailsVO, bltrObj]);

  const fetchLookupData = (action, parameterDetails, appId) => {
    setLoading(true);
    // Make your API call here using the action, parameterDetails, and appId parameters
    // Once you have the data, update the lookupOptions state variable
    // Example:
    fetch(`your-api-url?action=${action}&parameterDetails=${parameterDetails}&appId=${appId}`)
      .then(response => response.json())
      .then(data => {
        setLookupOptions(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  };

  const handleFilterOptions = (event, value) => {
    setSelectedValue(value);
    // Perform filtering based on the value
    // Update the lookupOptions state variable with the filtered results
    // Example:
    const filteredOptions = lookupOptions.filter(option => option.name.includes(value));
    setLookupOptions(filteredOptions);
  };

  return (
    <Grid item xs={2}>
      <FormControl fullWidth>
        <Autocomplete
          value={selectedValue}
          options={lookupOptions}
          getOptionLabel={option => option.name}
          onChange={(event, value) => setSelectedValue(value)}
          onOpen={() => {
            if (lookupOptions.length === 0) {
              const action = lookUpDetailsVO.action;
              const parameterDetails = lookUpDetailsVO.parameterDetails;
              const appId = bltrObj['appId'];
              fetchLookupData(action, parameterDetails, appId);
            }
          }}
          renderInput={params => (
            <TextField
              {...params}
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <>
                    {loading && <CircularProgress color="inherit" size={20} />}
                    {params.InputProps.startAdornment}
                  </>
                ),
              }}
              variant="outlined" // Add variant="outlined" for the border
              className="autocomplete-input" // Add a CSS class for custom styling
            />
          )}
        />
      </FormControl>
    </Grid>
  );
};

export default YourComponent;



import React, { useState, useEffect } from 'react';
import { Autocomplete, CircularProgress, FormControl, Grid, TextField } from '@material-ui/core';

const YourComponent = ({ lookUpDetailsVO, bltrObj }) => {
  const [selectedValue, setSelectedValue] = useState(null);
  const [lookupOptions, setLookupOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (lookUpDetailsVO && lookUpDetailsVO.customLookup && lookUpDetailsVO.parameterDetails) {
      const action = lookUpDetailsVO.action;
      const parameterDetails = lookUpDetailsVO.parameterDetails;
      const appId = bltrObj['appId'];
      fetchLookupData(action, parameterDetails, appId);
    }
  }, [lookUpDetailsVO, bltrObj]);

  const fetchLookupData = (action, parameterDetails, appId) => {
    setLoading(true);
    // Make your API call here using the action, parameterDetails, and appId parameters
    // Once you have the data, update the lookupOptions state variable
    // Example:
    fetch(`your-api-url?action=${action}&parameterDetails=${parameterDetails}&appId=${appId}`)
      .then(response => response.json())
      .then(data => {
        setLookupOptions(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  };

  const handleFilterOptions = (event, value) => {
    setSelectedValue(value);
    // Perform filtering based on the value
    // Update the lookupOptions state variable with the filtered results
    // Example:
    const filteredOptions = lookupOptions.filter(option => option.name.includes(value));
    setLookupOptions(filteredOptions);
  };

  return (
    <Grid item xs={2}>
      <FormControl fullWidth>
        <Autocomplete
          value={selectedValue}
          options={lookupOptions}
          getOptionLabel={option => option.name}
          onChange={(event, value) => setSelectedValue(value)}
          onOpen={() => {
            if (lookupOptions.length === 0) {
              const action = lookUpDetailsVO.action;
              const parameterDetails = lookUpDetailsVO.parameterDetails;
              const appId = bltrObj['appId'];
              fetchLookupData(action, parameterDetails, appId);
            }
          }}
          renderInput={params => (
            <TextField
              {...params}
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <>
                    {loading && <CircularProgress color="inherit" size={20} />}
                    {params.InputProps.startAdornment}
                  </>
                ),
              }}
            />
          )}
        />
      </FormControl>
    </Grid>
  );
};

export default YourComponent;

