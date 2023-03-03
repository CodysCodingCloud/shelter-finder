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

  // const [formError, setFormError] = useState({});
  // const [disableForm, setDisableForm] = useState(true);

  return (
    <div className="single-shelter-container">
      {shelter._id ? (
        <div>
          <div>{shelter.name}</div>
          <img
            src={shelter.avatar ? (shelter.avatar as string) : ''}
            alt={shelter.name as string}
          ></img>
        </div>
      ) : (
        <div>This resource does not exist</div>
      )}
    </div>
  );
}
