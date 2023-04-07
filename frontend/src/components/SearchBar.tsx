import React, { FormEvent } from 'react';
// import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getShelter } from '../store/reducers/shelterSlice';
// import { useNavigate } from 'react-router-dom';
// import { IShelter } from '../../../serversrc/db/Shelter';

export default function SearchBar() {
  const dispatch = useAppDispatch();
  // const params: any = useParams();

  // const navigate = useNavigate();
  // type shelterParams = { id: string };
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('hello');
    // dispatch()
  };

  return (
    <form
      className="d-flex ml-auto me-auto"
      role="search"
      onSubmit={handleSubmit}
    >
      <input
        className="form-control me-2"
        type="search"
        placeholder="Search for shelters"
        aria-label="Search"
      ></input>
      <button className="btn btn-outline-success" type="submit">
        Search
      </button>
    </form>
  );
}
