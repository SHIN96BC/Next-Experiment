import { configureStore } from '@reduxjs/toolkit';
import testSlice from '@Src/lib/features/test/testSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      tests: testSlice,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
