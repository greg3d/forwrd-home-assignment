import React from 'react';
import InputField from '../../../../components/InputField.jsx';
import { useSelector } from 'react-redux';
import { Grid } from '@mui/material';

const UserPhoneField = ({ children, editable, value, onChangeHandler, id }) => {

  const errors = useSelector((state) => state.validation.errors[id]?.['phone']);

  return (
    <Grid item xs={12} sm={6} md={2.5}>
      {!editable ? children : <InputField
        name={'phone'}
        value={value}
        error={errors === 'empty' || errors === 'invalid'}
        placeholder={'User phone'}
        onChangeHandler={onChangeHandler} />}
    </Grid>
  );

};

export default UserPhoneField;