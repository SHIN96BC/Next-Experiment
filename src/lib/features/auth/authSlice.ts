import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  name: string;
  token: string;
}

const initialState = {
  name: '',
  token: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth(state: AuthState, action: PayloadAction<AuthState>) {
      const newState = { ...state };
      newState.name = action.payload.name;
      newState.token = action.payload.token;

      return newState;
    },
    resetAuth() {
      return { name: '', token: '' };
    },
  },
});

export const { setAuth } = authSlice.actions;

export default authSlice.reducer;
