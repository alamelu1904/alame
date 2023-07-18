import React, { useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';

const MyAutocomplete = () => {
  const [lookupValue, setLookupValue] = useState('');
  const [dropdownOptions, setDropdownOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initialFetchDone, setInitialFetchDone] = useState(false);

  const fetchDropdownOptions = () => {
    setLoading(true);
    // Make the API request to fetch dropdown options
    fetch('your-api-endpoint')
      .then((response) => response.json())
      .then((data) => {
        setDropdownOptions(data);
        setLoading(false);
        setInitialFetchDone(true);
      })
      .catch((error) => {
        console.error('Error fetching dropdown options:', error);
        setLoading(false);
      });
  };

  const handleAutocompleteInputChange = (event, value) => {
    setLookupValue(value);
  };

  const handleAutocompleteInputChangeDelayed = (event, value) => {
    if (initialFetchDone) {
      // Filter options from the previously fetched dropdownOptions
      const filteredOptions = dropdownOptions.filter((option) =>
        option.display.toLowerCase().includes(value.toLowerCase())
      );
      setLookupValue(value);
      setDropdownOptions(filteredOptions);
    }
  };

  const handleAutocompleteClick = () => {
    if (!initialFetchDone) {
      fetchDropdownOptions();
    }
  };

  const handleAutocompleteChange = (event, value) => {
    setLookupValue(value.value || '');
  };

  return (
    <Autocomplete
      options={dropdownOptions}
      getOptionLabel={(option) => option.display}
      getOptionSelected={(option, value) => option.value === value.value}
      loading={loading}
      onInputChange={handleAutocompleteInputChange}
      onInputChangeDelayed={handleAutocompleteInputChangeDelayed}
      onClick={handleAutocompleteClick}
      onChange={handleAutocompleteChange}
      value={{ display: lookupValue }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Autocomplete"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
};

export default MyAutocomplete;
