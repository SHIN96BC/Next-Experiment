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
    setTestName(state, action: PayloadAction<string>) {
      state.testName = action.payload;
    },
  },
});

export const { setTestName } = testSlice.actions;

export default testSlice.reducer;
