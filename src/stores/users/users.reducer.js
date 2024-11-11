import { createReducer } from '@reduxjs/toolkit';
import {
  createUser,
  deleteUser,
  loadUsers,
  saveAll,
  setEditable,
  setError,
  setPage,
  setSearchPrompt,
  setUsers,
  updateUser,
} from './users.actions.js';

const initialState = {
  data: [],
  visible: [],
  usersToSave: [],
  usersToDelete: [],
  usersToCreate: [],
  isLoading: false,
  searchPrompt: '',
  error: null,
  page: 1,
  itemsPerPage: 6,
  totalPages: 1,

  nextId: 0,
};

const usersReducer = createReducer(initialState, (builder) => {

  const updatePaginationState = (state) => {
    if (!state.data || state.data.length === 0) {
      state.totalPages = 1;
      state.visible = [];
      return;
    }
    state.totalPages = Math.ceil(state.data.length / state.itemsPerPage);
    state.visible = state.data.slice((state.page - 1) * state.itemsPerPage, state.page * state.itemsPerPage);
  };

  builder
    .addCase(loadUsers, state => {
      state.isLoading = true;
      state.usersToSave = [];
      state.usersToDelete = [];
    })
    .addCase(setUsers, (state, action) => {
      state.data = action.payload.list;
      state.isLoading = false;
      updatePaginationState(state);
    })
    .addCase(setPage, (state, action) => {
      state.page = action.payload;
      updatePaginationState(state);
    })
    .addCase(setSearchPrompt, (state, action) => {
      state.searchPrompt = action.payload;
      updatePaginationState(state);
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    })
    .addCase(setEditable, (state, action) => {
      const { id, value } = action.payload;
      const index = state.data.findIndex(u => u.id === id);
      if (index >= 0) state.data[index].editable = value;
    })
    .addCase(createUser, (state, action) => {
      // if we create new one
      const user = {
        id: state.nextId++,
        name: '',
        email: '',
        phone: '',
        editable: true,
        new: true,
        country: '',
      };
      state.data.unshift(user);
      updatePaginationState(state);
    })
    .addCase(updateUser, (state, action) => {
      const user = action.payload;
      const indexData = state.data.findIndex(u => u.id === user.id);

      if (indexData >= 0) {
        state.data[indexData] = user;
        const index = state.usersToSave.findIndex(u => u.id === user.id);
        if (index >= 0) {
          state.usersToSave[index] = user;
        } else {
          state.usersToSave.push(user);
        }
        updatePaginationState(state);
      }
    })
    .addCase(deleteUser, (state, action) => {
      const id = action.payload;
      const indexData = state.data.findIndex(u => u.id === id);
      // optimistic delete
      if (indexData >= 0) {
        const user = state.data[indexData];
        state.data.splice(indexData, 1);
        // adding user to delete list
        if (state.usersToSave.includes(user)) {
          state.usersToSave.splice(state.usersToSave.indexOf(user), 1);
        }
        if (!user.new) {
          state.usersToDelete.push(user);
        }
      }
      updatePaginationState(state);
    })
    .addCase(saveAll, (state) => {
      state.isLoading = true;
    });
});

export default usersReducer;