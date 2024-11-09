import data from '../data/initialUsersData.json';
import storageService from './storageService.js';

// TODO: move to IndexedDB for persistence
// TODO: simulate real Axios behavior but with interceptors with mocks

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const getUsersData = () => {
  if (storageService.hasKey('users')) {
    return storageService.getData('users');
  } else {
    return data;
  }
};

export const getAllUsers = async () => {
  await delay(1500);
  return { list: getUsersData() };
};

export const getUsersByPage = async (page, limit) => {
  await delay(400);
  const actualData = getUsersData();
  const start = (page - 1) * limit;
  const end = start + limit;
  return {
    list: actualData.slice(start, end),
    totalItems: actualData.length,
    totalPages: Math.ceil(actualData.length / limit),
    page,
  };
};

export const editUserRequest = async (user) => {
  await delay(200);
  const actualData = getUsersData();
  const index = actualData.findIndex(u => u.id === user.id);
  actualData[index] = user;
  storageService.setData('users', actualData);
  return user;
};

export const deleteUserRequest = async (userId) => {
  await delay(300);
  const actualData = getUsersData();
  const index = actualData.findIndex(u => u.id === userId);
  actualData.splice(index, 1);
  storageService.setData('users', actualData);
  return userId;
};

export const searchUsers = async (searchText) => {
  await delay(1500);
  const actualData = getUsersData();
  return actualData.filter(user => {
    return user.name.toLowerCase().includes(searchText.toLowerCase());
  });
};