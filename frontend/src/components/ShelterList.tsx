import React from 'react';
import ShelterListItem from './ShelterListItem';
import { useAppSelector } from '../store/hooks';

import { ShelterInfo } from '../types/ShelterInfo';

export default function ShelterList({
  shelterList,
}: {
  shelterList: ShelterInfo[];
}) {
  const loading = useAppSelector((state) => state.shelter.loading);

  return (
    <div className="single-shelter-container container">
      {loading ? (
        <p>loading Results</p>
      ) : shelterList.length ? (
        shelterList.map((shelterInfo) => (
          <ShelterListItem shelterInfo={shelterInfo} key={shelterInfo._id} />
        ))
      ) : (
        <p>There are no shelters to display</p>
      )}
    </div>
  );
}
