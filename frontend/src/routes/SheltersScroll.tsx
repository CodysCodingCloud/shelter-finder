import React, { useState, useRef, useCallback } from 'react';
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
  const [loading, setLoading] = React.useState(true);
  const onScroll = useCallback(function () {
    const scrollTop = document.documentElement.scrollTop;
    // const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    if (listInnerRef.current) {
      const { offsetTop } = listInnerRef.current;
      if (scrollTop + clientHeight >= offsetTop) {
        setPage((page) => page + 1);
      }
    }
  }, []);
  const fetch = useCallback(
    async function (page: number) {
      try {
        setLoading(true);
        const { data: shelterListData }: { data: [] } = await axios.get(
          `/api/shelter/all-shelter-list-paginated/` + page
        );
        if (shelterListData.length) {
          setAllShelters((prev) => [...prev, ...shelterListData]);
          console.log(shelterListData);
          if (shelterListData.length < 5) {
            window.removeEventListener('scroll', onScroll);
          }
        }
        setLoading(false);
      } catch (error) {}
    },
    [onScroll]
  );
  React.useEffect(() => {
    window.addEventListener('scroll', onScroll);
    fetch(page);
    return () => window.removeEventListener('scroll', onScroll);
  }, [fetch, page, onScroll]);

  const listInnerRef = useRef(null);

  return (
    <div className="shelters">
      <h1>Shelter List</h1>
      <ShelterList shelterList={allShelters} />
      {!loading && <div ref={listInnerRef} id="refhere"></div>}
    </div>
  );
}
