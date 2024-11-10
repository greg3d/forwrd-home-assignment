import React from 'react';
import InputField from '../../../../components/InputField.jsx';
import { useSelector } from 'react-redux';
import { Grid } from '@mui/material';

const UserEmailField = ({ children, editable, value, onChangeHandler, id }) => {

  const errors = useSelector((state) => state.users.validationErrors[id]?.['email']);

  return (
    <Grid item xs={12} sm={6} md={4}>
      {!editable ? children : <InputField
        name={'email'}
        value={value}
        error={errors !== undefined && errors !== 'valid'}
        placeholder={'User email'}
        onChangeHandler={onChangeHandler} />}
    </Grid>
  );

};

export default UserEmailField;