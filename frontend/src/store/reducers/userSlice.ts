import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState, AppDispatch } from '../index';
import axios from 'axios';

// Define a type for the slice state
interface UserState {
  email: string;
  firstName: string;
  lastName: string;
}

// Define the initial state using that type
const initialState: UserState = { email: '', firstName: '', lastName: '' };
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
    // update: (state, action: PayloadAction<number>) => {
    //   state.value = action.payload;
    //   return state;
    // },
  },
});
export default userSlice.reducer;
export const { login, logout } = userSlice.actions;
// export const selectCount = (state: RootState) => state.user.value;
export const attemptPasswordLogin = (user: {
  email: string;
  password: string;
}) => {
  return async (dispatch: AppDispatch) => {
    try {
      const { data: newUser } = await axios.post('/api/login', {
        ...user,
      });
      dispatch(newUser);
    } catch (error) {
      throw error;
    }
  };
};
export const createUser = (user: { email: string; password: string }) => {
  return async (dispatch: AppDispatch) => {
    try {
      const { data: newUser } = await axios.post('/api/register', {
        ...user,
      });
      if (newUser) {
        attemptPasswordLogin(user)(dispatch);
      }
    } catch (error) {
      throw error;
    }
  };
};
