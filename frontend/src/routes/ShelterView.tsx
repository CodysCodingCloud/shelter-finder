import React from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getShelter } from '../store/reducers/shelterSlice';
import { Link } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
// import { IShelter } from '../../../serversrc/db/Shelter';

export default function ShelterView() {
  const dispatch = useAppDispatch();
  const params: any = useParams();
  const shelter = useAppSelector((state) => state.shelter.currentShelter);
  const ownerId = useAppSelector((state) => state.user._id);
  React.useEffect(() => {
    dispatch(getShelter(params.id));
  }, [params, dispatch]);
  let updated: number = Date.parse(shelter.updatedAt as string);
  const oneWeekAgo: Date = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  let oneWeekAgoMilli: number = Number(oneWeekAgo);
  // console.log('shelter', shelter);
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
            <p>{shelter.addressLine1}</p>
            {shelter.addressLine2 && <p className="">{shelter.addressLine2}</p>}
            <p className="">
              {shelter.city}, {shelter.stateAbbreviation}, {shelter.postal}
            </p>
            <p className="">phone: {shelter.phone}</p>
            <p className="">website: {shelter.website || 'N/A'}</p>
          </div>
          <div>
            <h3>Description</h3>
            <p className="">{shelter.description || 'N/A'}</p>
            <h3>Requirements</h3>
            <p className="">{shelter.requirements || 'N/A'} </p>
            <p className="">Capacity: {shelter.capacity || 'N/A'}</p>
            <p className="">Open Space: {shelter.openSpace || 'N/A'}</p>
            {updated < oneWeekAgoMilli && (
              <p>
                The previous contributer last updated this shelter over a week
                ago. Would you like to contribute and update any missing or
                incorrect information?
              </p>
            )}
            {(ownerId === shelter.user ||
              ownerId === '63e6d04dab9210bbfdafea62' ||
              updated < oneWeekAgoMilli) && (
              <Link to={'/edit/' + shelter._id} className="btn btn-primary">
                edit
              </Link>
            )}
          </div>
        </div>
      ) : (
        <div>This resource does not exist</div>
      )}
    </div>
  );
}
