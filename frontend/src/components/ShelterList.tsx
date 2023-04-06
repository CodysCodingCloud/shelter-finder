import React from 'react';
import ShelterListItem from './ShelterListItem';

import { ShelterInfo } from '../types/ShelterInfo';

export default function ShelterList({
  shelterList,
}: {
  shelterList: ShelterInfo[];
}) {
  return (
    <div className="single-shelter-container container">
      {shelterList &&
        shelterList.map((shelterInfo) => (
          <ShelterListItem shelterInfo={shelterInfo} key={shelterInfo._id} />
        ))}
    </div>
  );
}
