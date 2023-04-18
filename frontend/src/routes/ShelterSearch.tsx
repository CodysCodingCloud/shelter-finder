import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
// import { useNavigate } from 'react-router-dom';
// import { IShelter } from '../../../serversrc/db/Shelter';
import ShelterList from '../components/ShelterList';
import { fetchSearch } from '../store/reducers/shelterSlice';
export default function ShelterSearch() {
  const dispatch = useAppDispatch();
  // const params: any = useParams();
  const allShelters = useAppSelector((state) => state.shelter.allShelters);
  const queryStr = useAppSelector((state) => state.shelter.queryStr);
  const loading = useAppSelector((state) => state.shelter.loading);
  React.useEffect(() => {
    dispatch(fetchSearch(queryStr as string));
  }, [dispatch, queryStr]);

  return (
    <div className="shelters">
      <h1>Searching for...{queryStr}</h1>
      <ShelterList shelterList={allShelters} />
    </div>
  );
}
