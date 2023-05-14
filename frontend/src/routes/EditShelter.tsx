import React from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
// import { useNavigate } from 'react-router-dom';
import { updateShelter, getShelter } from '../store/reducers/shelterSlice';

import ShelterForm from '../components/ShelterForm';

export default function EditShelter() {
  const dispatch = useAppDispatch();
  const params = useParams();
  const initState = useAppSelector((state) => state.shelter.currentShelter);
  React.useEffect(() => {
    if (initState._id !== params.id) {
      dispatch(getShelter(params.id as string));
    }
  }, [dispatch, params, initState._id]);
  console.log(initState);
  // const initState = {
  //   name: '',
  //   organization: '',
  //   addressLine1: '',
  //   addressLine2: '',
  //   city: '',
  //   stateAbbreviation: '',
  //   postal: '',
  //   phone: '',
  //   openSpace: '',
  //   capacity: '',
  //   description: '',
  //   requirements: '',
  // };

  return <ShelterForm initState={initState} dispatchAction={updateShelter} />;
}
