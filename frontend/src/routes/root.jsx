import Welcome from '../components/Welcome';
import NavBar from '../components/NavBar';
import { Outlet } from 'react-router-dom';
export default function Root() {
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
