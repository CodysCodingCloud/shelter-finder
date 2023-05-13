import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { AppDispatch } from '../index';
import axios from 'axios';
import { AppThunk } from '../../types/AppThunk';
import { ShelterInfo } from '../../types/ShelterInfo';
import type { NavigateFunction } from 'react-router-dom';

interface ShelterState {
  currentShelter: ShelterInfo;
  myShelterList: ShelterInfo[];
  allShelters: ShelterInfo[];
  queryStr?: string;
  loading: boolean;
}
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
    website: '',
    openSpace: '',
    capacity: '',
    description: '',
    requirements: '',
  },
  myShelterList: [],
  allShelters: [],
  loading: false,
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
    search: (state: ShelterState, action: PayloadAction<string>) => {
      state.queryStr = action.payload;
      return state;
    },
    loading: (state: ShelterState, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
      return state;
    },
    getAllPaginatedShelterList: (
      state: ShelterState,
      action: PayloadAction<ShelterInfo[]>
    ) => {
      console.log(action.payload);
      state.allShelters = state.allShelters.concat(action.payload);
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
  search,
  loading,
  getAllPaginatedShelterList,
} = shelterSlice.actions;
// export const selectCount = (state: RootState) => state.shelter.value;

export const createShelter =
  (shelter: ShelterInfo, navigate: NavigateFunction): AppThunk =>
  async (dispatch) => {
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
      navigate('/singleview/' + shelterData._id);
    } catch (error: any) {
      console.error(error.response.data);
      // throw error
    }
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
export const updateShelter =
  (shelter: ShelterInfo, navigate: NavigateFunction): AppThunk =>
  async (dispatch) => {
    try {
      const { data: shelterData } = await axios.put(
        `/api/shelter/${shelter._id}`,
        {
          ...shelter,
        }
      );
      dispatch(replaceShelterInfo(shelterData));
      navigate('/singleview/' + shelterData._id);
    } catch (error: any) {
      console.log(error.response.data);
      // throw error
    }
  };
export const removeShelter = (shelter: ShelterInfo) => {
  return async (dispatch: AppDispatch) => {
    try {
      const { data: shelterData } = await axios.delete('/api/shelter/delete');
      dispatch(replaceShelterInfo(shelterData));
    } catch (error: any) {
      console.log(error.response.data);
    }
  };
};
export const fetchUserShelterList = () => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(loading(true));
      const token = window.localStorage.getItem('token');
      const { data: shelterListData } = await axios.get(
        '/api/shelter/user-shelter-list',
        {
          headers: {
            authorization: token,
          },
        }
      );
      dispatch(getUserShelterList(shelterListData));
      dispatch(loading(false));
    } catch (error: any) {
      console.log(error.response.data);
      // throw error
    }
  };
};

export const fetchAllShelterList = () => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(loading(true));
      const { data: shelterListData } = await axios.get(
        '/api/shelter/all-shelter-list'
      );
      dispatch(getAllShelterList(shelterListData));
      dispatch(loading(false));
    } catch (error: any) {
      console.log(error.response.data);
      // throw error
    }
  };
};
export const fetchAllPaginatedShelterList = (page: number) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(loading(true));
      const { data: shelterListData } = await axios.get(
        `/api/shelter/all-shelter-list-paginated/` + page
      );
      dispatch(getAllPaginatedShelterList(shelterListData));
      dispatch(loading(false));
    } catch (error: any) {
      console.log(error.response.data);
      // throw error
    }
  };
};
export const fetchSearch = (queryStr: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(loading(true));
      const { data: shelterListData } = await axios.put('/api/shelter/search', {
        queryStr: queryStr,
      });
      dispatch(getAllShelterList(shelterListData));
      dispatch(loading(false));
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
