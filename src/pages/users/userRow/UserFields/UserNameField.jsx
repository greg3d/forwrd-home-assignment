import React from 'react';
import InputField from '../../../../components/InputField.jsx';
import { useSelector } from 'react-redux';
import { Grid } from '@mui/material';

const UserNameField = ({ children, editable, value, onChangeHandler, id }) => {

  const errors = useSelector((state) => state.validation.errors[id]?.['name']);
  return (
    <Grid item xs={12} sm={6} md={2}>
      {!editable ? children : <InputField
        name={'name'}
        value={value}
        error={errors === 'empty' || errors === 'invalid'}
        placeholder={'User name'}
        onChangeHandler={onChangeHandler} />}
    </Grid>
  );

};

export default UserNameField;