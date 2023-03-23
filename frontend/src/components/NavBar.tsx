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

      {/* <div className="navBar">
        <div className="navLeft">
          <Link to="/" className="temp-link">
            Home
          </Link>
        </div>

        <div className="navRight">
          <div>
            <Link to="/login" className="temp">
              Login
            </Link>
          </div>
          <div>
            <Link to="/register" className="temp">
              Register
            </Link>
          </div>{' '}
          <div>
            <Link to="/shelter" className="temp">
              shelter
            </Link>
          </div>{' '}
          <div>
            <Link to="/newshelter" className="temp">
              newshelter
            </Link>
          </div>{' '}
          <div>
            <Link to="/singleview" className="temp">
              singleview
            </Link>
          </div>{' '}
          <div>
            <Link to="/shelters" className="temp">
              shelters
            </Link>
          </div>
          <LogoutButton />
        </div>
      </div> */}
    </nav>
  );
}
