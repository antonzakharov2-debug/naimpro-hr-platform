import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/slice/auth.slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

// типи для TS
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;