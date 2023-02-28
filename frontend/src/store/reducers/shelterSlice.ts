import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { AppDispatch } from '../index';
import axios from 'axios';

// Define a type for the slice state
interface ShelterInfo {
  _id?: String;
  name: String;
  addressLine1: String;
  addressLine2?: String;
  stateAbbreviation: String;
  postal: String;
  phone: String;
  openSpace?: String;
  capacity?: String;
  description: String;
  requirements: String;
  avater?: String;
  user?: String;
}
interface ShelterState {
  currentShelter: ShelterInfo;
  myShelterList: ShelterInfo[];
}
// Define the initial state using that type
const initialState: ShelterState = {
  currentShelter: {
    name: '',
    addressLine1: '',
    addressLine2: '',
    stateAbbreviation: '',
    postal: '',
    phone: '',
    openSpace: '',
    capacity: '',
    description: '',
    requirements: '',
  },
  myShelterList: [],
};
const shelterSlice = createSlice({
  name: 'shelter',
  initialState,
  reducers: {
    replaceShelterInfo: (
      state: ShelterState,
      action: PayloadAction<ShelterInfo>
    ) => {
      state.currentShelter = { ...action.payload };
      return state;
    },
    getShelterList: (
      state: ShelterState,
      action: PayloadAction<ShelterInfo[]>
    ) => {
      state.myShelterList = action.payload;
      return state;
    },
    logout: (state) => {
      state = initialState;
      return state;
    },
    // update: (state, action: PayloadAction<ShelterState>) => {
    //   state = action.payload;
    //   return state;
    // },
  },
});
export default shelterSlice.reducer;
export const { replaceShelterInfo, getShelterList, logout } =
  shelterSlice.actions;
// export const selectCount = (state: RootState) => state.shelter.value;

export const createShelter = (shelter: ShelterInfo, userId: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      const { data: shelterData } = await axios.post('/api/shelter/add', {
        ...shelter,
        user: userId,
      });
      dispatch(replaceShelterInfo(shelterData));
    } catch (error: any) {
      console.error(error.response.data);
      // throw error
    }
  };
};
export const getShelter = (_id: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      const { data: shelterData } = await axios.get(`/api/shelter/_id`);
      dispatch(getShelterList(shelterData));
    } catch (error: any) {
      console.log(error.response.data);
      // throw error
    }
  };
};
export const updateShelter = (shelter: ShelterState) => {
  return async (dispatch: AppDispatch) => {
    try {
      const { data: shelterData } = await axios.put('/api/shelter/update', {
        ...shelter,
      });
      dispatch(replaceShelterInfo(shelterData));
    } catch (error: any) {
      console.log(error.response.data);
      // throw error
    }
  };
};
export const removeShelter = (shelter: ShelterState) => {
  return async (dispatch: AppDispatch) => {
    try {
      const { data: shelterData } = await axios.delete('/api/shelter/delete');
      dispatch(replaceShelterInfo(shelterData));
    } catch (error: any) {
      console.log(error.response.data);
      // throw error
    }
  };
};
export const fetchUserShelterList = (_id: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      const { data: shelterListData } = await axios.put(
        '/api/shelter/shelter-list',
        _id
      );
      dispatch(getShelterList(shelterListData));
    } catch (error: any) {
      console.log(error.response.data);
      // throw error
    }
  };
};
// export const logoutThunk = () => {
//   return async (dispatch: AppDispatch) => {
//     window.localStorage.removeItem('token');
//     dispatch(logout);
//   };
// };
