import { loadUsers, setError, setUsers } from './users.actions.js';
import { getAllUsers, getUsersByPage } from '../../api/mocks.js';

const ITEMS_PER_PAGE = 9;

export const usersListener = [
  {
    actionCreator: loadUsers,
    effect: async (action, listenerApi) => {
      const { dispatch } = listenerApi;
      listenerApi.cancelActiveListeners();
      let users = [];
      try {
        if (action.payload) {
          users = await getUsersByPage(action.payload, ITEMS_PER_PAGE);
        } else {
          users = await getAllUsers();
        }
        dispatch(setUsers(users));
      } catch (error) {
        dispatch(setError(error));
        console.error(error);
      }
    },
  },
];