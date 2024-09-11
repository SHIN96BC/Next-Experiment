import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TestState {
  testName: string;
}

const initialState: TestState = {
  testName: '',
};

const testSlice = createSlice({
  name: 'tests',
  initialState,
  reducers: {
    setTestName(state: TestState, action: PayloadAction<string>) {
      const newState = { ...state };
      newState.testName = action.payload;

      return newState;
    },
  },
});

export const { setTestName } = testSlice.actions;

export default testSlice.reducer;
