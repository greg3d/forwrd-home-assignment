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
import { v1 as generate_uuid_v1 } from 'uuid';

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

  const addToSaveList = (state, user) => {
    const createIndex = state.usersToCreate.findIndex(u => u.id === user.id);

    if (createIndex !== -1) {
      addToCreateList(state, user);
      return;
    }
    const index = state.usersToSave.findIndex(u => u.id === user.id);
    if (index !== -1) {
      state.usersToSave[index] = user;
    } else {
      state.usersToSave.push(user);
    }
  };

  const addToCreateList = (state, user) => {
    const index = state.usersToCreate.findIndex(u => u.id === user.id);
    if (index !== -1) {
      state.usersToCreate[index] = user;
    } else {
      state.usersToCreate.push(user);
    }
  };

  const addToDeleteList = (state, user) => {
    if (!user.new) {
      // removing from saveList/createList and adding to deleteList
      const index = state.usersToCreate.findIndex(u => u.id === user.id);
      if (index !== -1) {
        state.usersToCreate = state.usersToCreate.filter(u => u.id !== user.id);
      } else {
        state.usersToSave = state.usersToSave.filter(u => u.id !== user.id);
        state.usersToDelete.push(user);
      }
    }
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
      if (index !== -1) state.data[index].editable = value;
    })
    .addCase(createUser, (state, action) => {
      const user = {
        id: generate_uuid_v1(),
        name: '',
        email: '',
        phone: '',
        country: '',
        // service fields
        new: true,
        editable: true,
      };
      state.data.unshift(user);
      updatePaginationState(state);
    })
    .addCase(updateUser, (state, action) => {
      const user = action.payload;
      delete user.editable;
      const index = state.data.findIndex(u => u.id === user.id);
      if (index !== -1) {
        if (user.new) {
          delete user.new;
          addToCreateList(state, user);
        } else {
          addToSaveList(state, user);
        }
        state.data[index] = user;
        updatePaginationState(state);
      }
    })
    .addCase(deleteUser, (state, action) => {
      const id = action.payload;
      const index = state.data.findIndex(u => u.id === id);

      if (index !== -1) {
        const user = state.data[index];
        state.data = state.data.filter(u => u.id !== id);
        addToDeleteList(state, user);
      }
      updatePaginationState(state);
    })
    .addCase(saveAll, (state) => {
      state.isLoading = true;
    });
});

export default usersReducer;