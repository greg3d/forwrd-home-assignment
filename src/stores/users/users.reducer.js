import { createReducer } from '@reduxjs/toolkit';
import { editUser, loadUsers, saveUser, setError, setSearchPrompt, setUsers } from './users.actions.js';

const initialState = {
  users: [],
  isLoading: false,
  searchPrompt: '',
  error: null,
  userToEdit: null,
};

const usersReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadUsers, state => {
      state.isLoading = true;
      state.userToEdit = null;
    })
    .addCase(setUsers, (state, action) => {
      state.users = action.payload;
      state.isLoading = false;
      state.userToEdit = null;
    })
    .addCase(setSearchPrompt, (state, action) => {
      state.searchPrompt = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    })
    .addCase(editUser, (state, action) => {
      const id = action.payload;
      const user = state.users.find(user => user.id === id);
      if (user) {
        state.userToEdit = user;
      }
    })
    .addCase(saveUser, (state, action) => {
      const user = action.payload;
      const index = state.users.findIndex(u => u.id === user.id);
      if (index !== -1) {
        // optimistic update
        state.users[index] = user;
      } else {
        state.users.push(user);
      }
      state.userToEdit = null;
    });
});

export default usersReducer;