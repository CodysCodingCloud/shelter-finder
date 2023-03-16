import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
// import { getShelter } from '../store/reducers/shelterSlice';
// import { useNavigate } from 'react-router-dom';
// import { IShelter } from '../../../serversrc/db/Shelter';

export default function UserInfo() {
  const dispatch = useAppDispatch();
  // const params: any = useParams();
  const user = useAppSelector((state) => state.user);
  React.useEffect(() => {}, [dispatch]);

  return <div className="shelters"></div>;
}
