import React from 'react';
import { useParams } from 'react-router-dom';
import { getShelter } from '../../store/reducers/shelterSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
// import { useNavigate } from 'react-router-dom';
import { updateShelter } from '../../store/reducers/shelterSlice';

import ShelterForm from '../../components/ShelterForm';
export default function RegisterShelter() {
  const dispatch = useAppDispatch();
  const params: any = useParams();
  const shelter = useAppSelector((state) => state.shelter.currentShelter);
  const userid = useAppSelector((state) => state.user._id);
  React.useEffect(() => {
    dispatch(getShelter(params.id));
  }, [params, dispatch]);

  return (
    <>
      {shelter.user === userid ? (
        <ShelterForm initState={shelter} dispatchAction={updateShelter} />
      ) : shelter._id ? (
        <h2>Not Authorized to edit this shelter</h2>
      ) : (
        <h2>Loading</h2>
      )}
    </>
  );
}
