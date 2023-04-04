import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
// import { IShelter } from '../../../serversrc/db/Shelter';
import { fetchUserShelterList } from '../../store/reducers/shelterSlice';
import ShelterList from '../../components/ShelterList';
export default function MyShelters() {
  const dispatch = useAppDispatch();
  const myshelter = useAppSelector((state) => state.shelter.myShelterList);
  React.useEffect(() => {
    dispatch(fetchUserShelterList());
  }, [dispatch]);

  return (
    <div className="shelters">
      <h1>My Shelters</h1>
      <ShelterList shelterList={myshelter} />
    </div>
  );
}
