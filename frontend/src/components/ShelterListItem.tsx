import React, { useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { useAppDispatch, useAppSelector } from '../store/hooks';
// import { getShelter } from '../store/reducers/shelterSlice';
// import { useNavigate } from 'react-router-dom';

export default function ShelterListItem({ shelterInfo }: any) {
  return (
    <div className="container">
      <h1 className="row">{shelterInfo.name}</h1>
      <div className="col-4">
        <img
          src={shelterInfo.avatar ? (shelterInfo.avatar as string) : ''}
          alt={shelterInfo.name as string}
        ></img>
      </div>
      <div className="col-8">
        <h2 className="">{shelterInfo.organization}</h2>
        <p className="">{shelterInfo.addressLine1}</p>
        <p>
          {shelterInfo.addressLine1} {'\n\ngodly\n\n'}{' '}
          {shelterInfo.addressLine1}
        </p>
        {shelterInfo.addressLine2 && (
          <p className="">{shelterInfo.addressLine2}</p>
        )}
        <p className="">
          {shelterInfo.city}, {shelterInfo.stateAbbreviation},
          {shelterInfo.postal}
        </p>
        <p className="">contact: {shelterInfo.phone}</p>
      </div>

      <div className="row"></div>
    </div>
  );
}
