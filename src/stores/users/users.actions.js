import { createAction } from '@reduxjs/toolkit';

export const loadUsers = createAction('users/loadUsers');
export const setUsers = createAction('users/setUsers');
export const setPage = createAction('users/setPage');
export const setError = createAction('users/setError');
export const setSearchPrompt = createAction('users/setSearchPrompt');
export const createUser = createAction('users/createUser');
export const updateUser = createAction('users/saveUser');
export const deleteUser = createAction('users/deleteUser');
export const setEditable = createAction('users/setEditable');
export const saveAll = createAction('users/saveAll');