import { loadUsers, setError, setUsers } from './users.actions.js';
import { getAllUsers } from '../../api/mocks.js';

export const usersListener = [
  {
    actionCreator: loadUsers,
    effect: async (action, listenerApi) => {
      const { dispatch } = listenerApi;
      try {
        const users = await getAllUsers();
        dispatch(setUsers(users));
      } catch (error) {
        dispatch(setError(error));
        console.error(error);
      }
    },
  },
];