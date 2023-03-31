import React from 'react';
import { Link } from 'react-router-dom';
// import { useParams } from 'react-router-dom';
// import { useAppDispatch, useAppSelector } from '../store/hooks';
// import { getShelter } from '../store/reducers/shelterSlice';
// import { useNavigate } from 'react-router-dom';

export default function ShelterListItem({ shelterInfo }: any) {
  return (
    <div className="row">
      <Link to={`/singleview/${shelterInfo._id}`}>
        <div className="card">
          <div className="row card-body">
            <img
              src={
                shelterInfo.avatar
                  ? '/' + (shelterInfo.avatar as string)
                  : '/placeholder-shelter.png'
              }
              alt={shelterInfo.name as string}
              className="col-md-6 "
              // style={{ width: '100%' }}
            ></img>

            <div className="col-md-6">
              <h2 className="card-title">{shelterInfo.name}</h2>
              <h3 className="card-subtitle mb-2 text-muted">
                {shelterInfo.organization}
              </h3>
              <p className="card-text">{shelterInfo.addressLine1}</p>
              <p className="card-text">
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
          </div>
        </div>
      </Link>
    </div>
  );
}
