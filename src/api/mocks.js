import data from '../data/initialUsersData.json';
import { UserRepo } from './UserRepo.js';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const userRepo = new UserRepo('UserDatabase', 'Users', data);

const getUsersData = async () => {
  await userRepo.openDB();
  return userRepo.getAllUsers();
};

export const getAllUsers = async () => {
  await delay(300);
  const list = await getUsersData();
  return { list };
};

export const searchUsers = async (searchText) => {
  await delay(300);
  await userRepo.searchUsers(searchText);
};

export const saveAllRequest = async ({ usersToSave, usersToDelete, usersToCreate }) => {

  if (usersToDelete && usersToDelete.length > 0)
    await userRepo.deleteUsers(usersToDelete.map(user => user.id));

  if (usersToSave && usersToSave.length > 0)
    await userRepo.updateUsers(usersToSave);

  if (usersToCreate && usersToCreate.length > 0)
    await userRepo.addUsers(usersToCreate);

  return true;
};