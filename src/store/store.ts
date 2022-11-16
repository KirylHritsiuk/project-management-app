import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { api } from 'api/api';
import boardsSlice from './slices/boardsSlice';
import notificationSlice from './slices/notificationSlice';
import userSlice from './slices/userSlice';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    user: userSlice,
    boards: boardsSlice,
    notification: notificationSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
