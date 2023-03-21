import { useEffect } from 'react';
import { useAppDispatch } from '../store/hooks';
import { attemptTokenLogin } from '../store/reducers/userSlice';
import Welcome from './Welcome';
import NavBar from '../components/NavBar';
import { Outlet } from 'react-router-dom';
export default function Root() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(attemptTokenLogin());
  }, [dispatch]);
  return (
    <>
      <div id="sidebar">
        <Welcome></Welcome>
        <NavBar></NavBar>
      </div>
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
}
