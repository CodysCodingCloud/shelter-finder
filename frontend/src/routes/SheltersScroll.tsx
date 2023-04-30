import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getShelter } from '../store/reducers/shelterSlice';
// import { useNavigate } from 'react-router-dom';
// import { IShelter } from '../../../serversrc/db/Shelter';
import ShelterList from '../components/ShelterList';
import { fetchAllPaginatedShelterList } from '../store/reducers/shelterSlice';
export default function ShelterScroll() {
  const [page, setPage] = React.useState(0);
  const [allShelters, setAllShelters] = React.useState([]);
  const dispatch = useAppDispatch();
  // const params: any = useParams();
  // const allShelters = useAppSelector((state) => state.shelter.allShelters);
  React.useEffect(() => {
    // dispatch(fetchAllPaginatedShelterList(page));
    (async function () {
      try {
        const { data: shelterListData } = await axios.get(
          `/api/shelter/all-shelter-list-paginated/` + page
        );
        setAllShelters(allShelters.concat(shelterListData));
      } catch (error) {}
    })();
  }, [page]);
  const listInnerRef = useRef(null);
  const onScroll = function () {
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      console.log(scrollTop, scrollHeight, clientHeight);
      if (scrollTop + clientHeight === scrollHeight) {
        setPage(page + 1);
        dispatch(fetchAllPaginatedShelterList(page));
      }
    }
  };
  return (
    <div className="shelters">
      <h1>Shelter List</h1>
      <ShelterList shelterList={allShelters} />
      {allShelters.length >= 5 && (
        <div onScroll={onScroll} ref={listInnerRef} id="refhere"></div>
      )}
    </div>
  );
}
