import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../index';
import axios from 'axios';
// Define a type for the slice state
interface UserState {
  value: number;
}

// Define the initial state using that type
const initialState: UserState = {
  value: 0,
};
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state = action.payload;
      return state;
    },
    logout: (state) => {
      state = initialState;
      return state;
    },
    update: (state, action: PayloadAction<number>) => {
      state.value = action.payload;
      return state;
    },
  },
});
export default userSlice.reducer;
export const { login, logout, update } = userSlice.actions;
export const selectCount = (state: RootState) => state.user.value;
