import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getShelter } from '../store/reducers/shelterSlice';
// import { useNavigate } from 'react-router-dom';
// import { IShelter } from '../../../serversrc/db/Shelter';
import FormItem from './FormItem';

export default function ShelterForm() {
  const shelter = useAppSelector((state) => state.shelter.currentShelter);
  const dispatch = useAppDispatch();
  // const navigate = useNavigate();
  // type shelterParams = { id: string };
  const params: any = useParams();
  const [formError, setFormError] = useState({});
  const [disableForm, setDisableForm] = useState(true);
  React.useEffect(() => {
    dispatch(getShelter(params.id));
  }, []);

  return (
    <div className="single-shelter-container">
      {shelter._id ? (
        <div>
          <img src=""></img>
          <div>Name</div>
        </div>
      ) : (
        <div>This resource does not exist</div>
      )}
    </div>
  );
}
