import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { AppDispatch } from '../index';
import axios from 'axios';

// Define a type for the slice state
export interface ShelterInfo {
  _id?: string;
  name: string;
  organization: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  stateAbbreviation: string;
  postal: string;
  phone: string;
  openSpace?: string;
  capacity?: string;
  description: string;
  requirements: string;
  avatar?: string | File;
  user?: string;
}
interface ShelterState {
  currentShelter: ShelterInfo;
  myShelterList: ShelterInfo[];
  allShelters: ShelterInfo[];
}
// Define the initial state using that type
const initialState: ShelterState = {
  currentShelter: {
    name: '',
    organization: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    stateAbbreviation: '',
    postal: '',
    phone: '',
    openSpace: '',
    capacity: '',
    description: '',
    requirements: '',
  },
  myShelterList: [],
  allShelters: [],
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
    getUserShelterList: (
      state: ShelterState,
      action: PayloadAction<ShelterInfo[]>
    ) => {
      state.myShelterList = action.payload;
      return state;
    },
    getAllShelterList: (
      state: ShelterState,
      action: PayloadAction<ShelterInfo[]>
    ) => {
      state.allShelters = action.payload;
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
export const {
  replaceShelterInfo,
  getUserShelterList,
  getAllShelterList,
  logout,
} = shelterSlice.actions;
// export const selectCount = (state: RootState) => state.shelter.value;

export const createShelter = (shelter: ShelterInfo) => {
  return async (dispatch: AppDispatch) => {
    const formData = new FormData();
    let key: keyof typeof shelter;
    for (key in shelter) {
      formData.append(key, shelter[key] as string | File);
    }
    try {
      const { data: shelterData } = await axios.put(
        '/api/shelter/add',
        formData
      );
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
      const { data: shelterData } = await axios.get(`/api/shelter/${_id}`);
      console.log(shelterData);

      dispatch(replaceShelterInfo(shelterData));
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
      const token = window.localStorage.getItem('token');
      const { data: shelterListData } = await axios.get(
        '/api/shelter/shelter-list',
        {
          headers: {
            authorization: token,
          },
        }
      );
      dispatch(getUserShelterList(shelterListData));
    } catch (error: any) {
      console.log(error.response.data);
      // throw error
    }
  };
};

export const fetchAllShelterList = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const { data: shelterListData } = await axios.get(
        '/api/shelter/all-shelter-list'
      );
      dispatch(getAllShelterList(shelterListData));
    } catch (error: any) {
      console.log(error.response.data);
      // throw error
    }
  };
};
export const changeShelterOwner = (email: string, id: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      const token = window.localStorage.getItem('token');
      const { data: shelterListData } = await axios.get(
        `/api/shelter/changeowner/${id}`,
        {
          headers: {
            authorization: token,
          },
        }
      );
      dispatch(replaceShelterInfo(shelterListData));
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
