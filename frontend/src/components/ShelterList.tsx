import React from 'react';
import ShelterListItem from './ShelterListItem';

import { ShelterInfo } from '../store/reducers/shelterSlice';

export default function ShelterList({
  shelterList,
}: {
  shelterList: ShelterInfo[];
}) {
  return (
    <div className="single-shelter-container">
      {shelterList &&
        shelterList.map((shelterInfo) => (
          <ShelterListItem shelterInfo={shelterInfo} />
        ))}
    </div>
  );
}
