import { loadUsers, saveAll, setError, setUsers } from './users.actions.js';
import { getAllUsers, saveAllRequest } from '../../api/mocks.js';

export const usersListener = [
  {
    actionCreator: loadUsers,
    effect: async (action, listenerApi) => {
      const { dispatch } = listenerApi;
      const invalidate = action.payload;
      listenerApi.cancelActiveListeners();
      try {
        let users = listenerApi.getState().users.data;
        if (invalidate || !users || users.length === 0) {
          users = await getAllUsers();
          dispatch(setUsers(users));
        }
      } catch (error) {
        dispatch(setError("Unable to Load Users"));
        console.error(error);
      }
    },
  }, {
    actionCreator: saveAll,
    effect: async (action, listenerApi) => {
      const { dispatch } = listenerApi;
      const { usersToSave, usersToDelete, usersToCreate } = listenerApi.getState().users;
      try {
        await saveAllRequest({ usersToSave, usersToDelete, usersToCreate });
        dispatch(loadUsers(true));
      } catch (error) {
        dispatch(setError("Unable to Save Users"));
        console.error(error);
      }
    },
  },
];