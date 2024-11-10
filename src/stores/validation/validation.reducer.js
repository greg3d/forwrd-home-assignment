import { createReducer } from '@reduxjs/toolkit';
import { resetValidationErrors, setValidationError } from './validation.actions.js';

const initialState = {
  validationErrors: {},
  emptyFields: 0,
  invalidFields: 0,
};

const validationReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setValidationError, (state, action) => {
      const { id, name, error } = action.payload;
      state.validationErrors = { ...state.validationErrors, [id]: { ...state.validationErrors[id], [name]: error } };
    })
    .addCase(resetValidationErrors, (state, action) => {
      const id = action.payload;
      delete state.validationErrors[id];
    })
    .addMatcher(action => action.type.includes('Validation'), (state, action) => {
      const counts = Object.values(state.validationErrors).reduce((acc, errors) => {
        acc.emptyFields += Object.values(errors).filter(e => e === 'empty').length;
        acc.invalidFields += Object.values(errors).filter(e => e === 'invalid').length;
        return acc;
      }, { emptyFields: 0, invalidFields: 0 });

      state.emptyFields = counts.emptyFields;
      state.invalidFields = counts.invalidFields;
    });
});

export default validationReducer;