import React from 'react';
import { useSelector } from 'react-redux';
import { Autocomplete, Grid, TextField } from '@mui/material';
import { useCountryOptions } from '../../../../hooks/useCountryOptions.js';

const UserCountryField = ({ children, editable, value, onChangeHandler, id }) => {

  const errors = useSelector((state) => state.users.validationErrors[id]?.['country']);
  const options = useCountryOptions();

  const renderField = () => (
    <Autocomplete
      freeSolo
      name={'country'}
      options={options}
      value={value}
      onChange={(e, val) => onChangeHandler('country', val)}
      renderInput={(params) => <TextField
        {...params}
        error={errors !== undefined && errors !== 'valid'}
        variant="outlined"
        size="small"
        fullWidth />}
    />
  );

  return (
    <Grid item xs={12} sm={6} md={2}>
      {!editable ? children : renderField()}
    </Grid>
  );

};

export default UserCountryField;