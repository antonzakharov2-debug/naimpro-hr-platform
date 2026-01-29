import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { register } from '../api/auth.api';
import type { RegisterRequest } from '../types';

interface AuthState {
  loading: boolean;
  error: string | null;
  isRegistered: boolean;
}

const initialState: AuthState = {
  loading: false,
  error: null,
  isRegistered: false,
};

// async thunk для реєстрації
export const registerUser = createAsyncThunk(
  'auth/register',
  async (data: RegisterRequest, { rejectWithValue }) => {
    try {
      return await register(data);
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Registration failed'
      );
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetAuthState(state) {
      state.loading = false;
      state.error = null;
      state.isRegistered = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.isRegistered = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetAuthState } = authSlice.actions;
export default authSlice.reducer;
