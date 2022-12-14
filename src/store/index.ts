import { configureStore } from '@reduxjs/toolkit';
import reduxLogger from 'redux-logger';
// import { useMemo } from 'react';
import { userSlice } from './reducers';

export const store = configureStore({
  reducer: {
    user: userSlice,
  },
  middleware: (getDefaultMiddleware) => {
    if (process.env.NODE_ENV === 'production') {
      return getDefaultMiddleware();
    } else {
      return getDefaultMiddleware().concat(reduxLogger);
    }
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
