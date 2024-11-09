import { createAction } from '@reduxjs/toolkit';

export const loadUsers = createAction('users/loadUsers');
export const setUsers = createAction('users/setUsers');
export const setError = createAction('users/setError');
export const setSearchPrompt = createAction('users/setSearchPrompt');
export const saveUser = createAction('users/saveUser');
export const editUser = createAction('users/editUser');
export const deleteUser = createAction('users/deleteUser');