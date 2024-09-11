import { configureStore } from '@reduxjs/toolkit';
import testSlice from '@Src/lib/features/test/testSlice';
import authSlice from '@Src/lib/features/auth/authSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authSlice,
      tests: testSlice,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
