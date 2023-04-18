import React, { FormEvent, useState } from 'react';
// import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getShelter } from '../store/reducers/shelterSlice';
import { useNavigate } from 'react-router-dom';
// import { IShelter } from '../../../serversrc/db/Shelter';
import { search } from '../store/reducers/shelterSlice';
export default function SearchBar() {
  const [searchStr, setSearchStr] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(search(searchStr));
    navigate('/search');
  };

  return (
    <form
      className="d-flex ml-auto me-auto"
      role="search"
      onSubmit={handleSubmit}
    >
      <input
        className="form-control me-2 sbf"
        type="search"
        placeholder="Search for shelters"
        aria-label="Search"
        value={searchStr}
        onChange={(e) => setSearchStr(e.target.value)}
      ></input>
      <button className="btn btn-outline-success" type="submit">
        Search
      </button>
    </form>
  );
}
