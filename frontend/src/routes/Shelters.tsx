import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getShelter } from '../store/reducers/shelterSlice';
// import { useNavigate } from 'react-router-dom';
// import { IShelter } from '../../../serversrc/db/Shelter';
import ShelterList from '../components/ShelterList';
import { fetchAllShelterList } from '../store/reducers/shelterSlice';
export default function Shelters() {
  const dispatch = useAppDispatch();
  // const params: any = useParams();
  const allShelters = useAppSelector((state) => state.shelter.allShelters);
  React.useEffect(() => {
    dispatch(fetchAllShelterList());
  }, [dispatch]);

  return (
    <div className="shelters">
      <h1>Shelter List</h1>
      <ShelterList shelterList={allShelters} />
    </div>
  );
}
