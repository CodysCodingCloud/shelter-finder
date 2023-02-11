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
    login: (state, action: PayloadAction<UserState>) => {
      state = { ...action.payload };
      return state;
    },
    logout: (state) => {
      state = initialState;
      return state;
    },
    update: (state, action: PayloadAction<UserState>) => {
      state = action.payload;
      return state;
    },
  },
});
export default userSlice.reducer;
export const { login, logout, update } = userSlice.actions;
// export const selectCount = (state: RootState) => state.user.value;
export const attemptPasswordLogin = (user: {
  email: string;
  password: string;
}) => {
  return async (dispatch: AppDispatch) => {
    try {
      const { data: token } = await axios.post('/api/user/login', {
        ...user,
      });
      window.localStorage.setItem('token', token);
      console.log('gotly token', token);
      dispatch(attemptTokenLogin());
    } catch (error) {
      throw error;
    }
  };
};
export const attemptTokenLogin = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const token = window.localStorage.getItem('token');
      if (token) {
        console.log(token);
        const { data: userInfo } = await axios.post(
          '/api/user/token',
          {},
          {
            headers: {
              authorization: token,
            },
          }
        );
        console.log('userinbfo', userInfo);
        dispatch(login(userInfo));
      }
    } catch (error) {}
  };
};
export const createUser = (user: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  affiliation: string;
}) => {
  return async (dispatch: AppDispatch) => {
    try {
      console.log('reg', user);
      const { data: token } = await axios.post('/api/user/register', {
        ...user,
      });
      if (token) {
        console.log('regis token', token);

        window.localStorage.setItem('token', token);
        attemptTokenLogin()(dispatch);
      }
    } catch (error: any) {
      console.log(error.response.data);
      // throw error
    }
  };
};
export const logoutThunk = () => {
  return async (dispatch: AppDispatch) => {
    window.localStorage.removeItem('token');
    dispatch(logout);
  };
};
