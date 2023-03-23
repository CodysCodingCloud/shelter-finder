import React from 'react';
import { Link, NavLink } from 'react-router-dom';
// import { useAppDispatch, useAppSelector } from '../store/hooks';
import LogoutButton from './LogoutButton';
export default function NavBar() {
  // const user = useAppSelector((state) => state.user);
  // function toggle(e) {
  //   console.log(e.target);
  // }
  return (
    <nav className="navbar navbar-light bg-light navbar-expand-md">
      <a className="navbar-brand" href="/">
        <Link to="/" className="navbar-brand">
          <img src="/logo.svg" width="30" height="30" alt="" /> TempHome
        </Link>
      </a>

      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
        // onClick={toggle}
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          {/* <li className="nav-item active"> */}
          <Link className="nav-item nav-link" to="/">
            Home
          </Link>
          <Link className="nav-item nav-link" to="/login">
            login
          </Link>
          <Link className="nav-item nav-link disabled" to="/register">
            register
          </Link>
          <Link className="nav-item nav-link" to="/shelters">
            shelter list
          </Link>
          <Link className="nav-item nav-link" to="/newshelter">
            newshelter reg
          </Link>
          <Link className="nav-item nav-link" to="/singleview">
            singleview
          </Link>
          <Link className="nav-item nav-link" to="/my-shelters">
            MyShelters
          </Link>
          <Link className="nav-item nav-link" to="/shelter">
            shelter
          </Link>
        </ul>
      </div>
    </nav>
  );
}
