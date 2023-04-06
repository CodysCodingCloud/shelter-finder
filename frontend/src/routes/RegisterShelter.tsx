import React from 'react';
// import { useAppDispatch, useAppSelector } from '../store/hooks';
// import { useNavigate } from 'react-router-dom';
import { createShelter } from '../store/reducers/shelterSlice';

import ShelterForm from '../components/ShelterForm';
export default function RegisterShelter() {
  const initState = {
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
  };

  return <ShelterForm initState={initState} dispatchAction={createShelter} />;
}
