import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getShelter } from '../store/reducers/shelterSlice';
// import { useNavigate } from 'react-router-dom';
// import { IShelter } from '../../../serversrc/db/Shelter';
import FormItem from './FormItem';

export default function ShelterView() {
  const dispatch = useAppDispatch();
  const params: any = useParams();
  const shelter = useAppSelector((state) => state.shelter.currentShelter);
  React.useEffect(() => {
    console.log('123123', params);
    dispatch(getShelter(params.id));
  }, [params, dispatch]);

  console.log('shelter', shelter);
  // const navigate = useNavigate();
  // type shelterParams = { id: string };

  return (
    <div className="single-shelter-container">
      {shelter._id ? (
        <div className="container">
          <h1 className="row">{shelter.name}</h1>
          <img
            src={shelter.avatar ? (shelter.avatar as string) : ''}
            alt={shelter.name as string}
          ></img>
          <div className="row">
            <h2 className="">{shelter.organization}</h2>
            <p className="">{shelter.addressLine1}</p>
            <p>
              {shelter.addressLine1} {'\n\ngodly\n\n'} {shelter.addressLine1}
            </p>
            {shelter.addressLine2 && <p className="">{shelter.addressLine2}</p>}
            <p className="">
              {shelter.city}, {shelter.stateAbbreviation}, {shelter.postal}
            </p>
            <p className="">contact: {shelter.phone}</p>
          </div>
          <div>
            <h3>Description</h3>
            <p className="">{shelter.description}</p>
            <h3>Requirements</h3>
            <p className="">{shelter.requirements}</p>
            <p className="">Capacity: {shelter.capacity || 'N/A'}</p>
            <p className="">Open Space: {shelter.openSpace || 'N/A'}</p>
          </div>
        </div>
      ) : (
        <div>This resource does not exist</div>
      )}
    </div>
  );
}
