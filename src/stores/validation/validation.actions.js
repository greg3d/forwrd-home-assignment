import { createAction } from '@reduxjs/toolkit';

export const setValidationError = createAction('users/setValidationError');
export const resetValidationErrors = createAction('users/resetValidationErrors');