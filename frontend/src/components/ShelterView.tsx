import React from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getShelter } from '../store/reducers/shelterSlice';
// import { useNavigate } from 'react-router-dom';
// import { IShelter } from '../../../serversrc/db/Shelter';

export default function ShelterView() {
  const dispatch = useAppDispatch();
  const params: any = useParams();
  const shelter = useAppSelector((state) => state.shelter.currentShelter);
  React.useEffect(() => {
    dispatch(getShelter(params.id));
  }, [params, dispatch]);

  console.log('shelter', shelter);
  // const navigate = useNavigate();
  // type shelterParams = { id: string };

  return (
    <div className="single-shelter-container">
      {shelter._id ? (
        <div className="container">
          <h1 className="col-12">{shelter.name}</h1>
          <img
            src={
              shelter.avatar
                ? '/' + (shelter.avatar as string)
                : '/placeholder-shelter.png'
            }
            alt={shelter.name as string}
            className="col-12"
          ></img>
          <div className="col-12">
            <h2 className="">{shelter.organization}</h2>
            <p className="">{shelter.addressLine1}</p>
            <p>{shelter.addressLine1}</p>
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
