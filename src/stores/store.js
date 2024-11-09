import { configureStore, createListenerMiddleware } from '@reduxjs/toolkit';
import usersReducer from './users/users.reducer.js';
import { usersListener } from './users/users.listener.js';

const registerListeners = (listeners, middleware) => {
  listeners.forEach(listener => {
    middleware.startListening(listener);
  });
};

// listenerMW init
const listenerMiddleware = createListenerMiddleware();

// registering listeners
registerListeners(usersListener, listenerMiddleware);

// store init
export const store = configureStore({
  reducer: {
    users: usersReducer,
    statistics: null
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(listenerMiddleware),
});

