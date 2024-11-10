import { createReducer } from '@reduxjs/toolkit';
import { loadUsers, setError, setSearchPrompt, setUsers, updateUser } from './users.actions.js';

const initialState = {
  users: [],
  isLoading: false,
  searchPrompt: '',
  error: null,
  page: 1,
  totalPages: 1,
  totalItems: 0,

  validationErrors: {},
  emptyFields: 0,
  invalidFields: 0,

};

const usersReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadUsers, state => {
      state.isLoading = true;
      state.emptyFields = 0;
      state.errorFields = 0;
    })
    .addCase(setUsers, (state, action) => {
      state.users = action.payload.list;
      state.page = action.payload.page;
      state.totalItems = action.payload.totalItems;
      state.totalPages = action.payload.totalPages;
      state.isLoading = false;
    })
    .addCase(setSearchPrompt, (state, action) => {
      state.searchPrompt = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    })
    .addCase(updateUser, (state, action) => {
      const user = action.payload;
      const index = state.users.findIndex(u => u.id === user.id);
      if (index !== -1) {
        // optimistic update
        state.users[index] = user;
      } else {
        state.users.push(user);
      }
    });

});

export default usersReducer;