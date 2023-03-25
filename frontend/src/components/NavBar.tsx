import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';
import LogoutButton from './LogoutButton';
export default function NavBar() {
  const id = useAppSelector((state) => state.user._id);
  // function toggle(e) {
  //   console.log(e.target);
  // }
  return (
    <nav className="navbar navbar-light bg-light navbar-expand-md">
      <Link to="/" className="navbar-brand">
        <img src="/logo.svg" width="30" height="30" alt="" /> Shelter Finder
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <div className="navbar-nav">
          {/* <li className="nav-item active"> */}
          <Link className="nav-item nav-link text-center" to="/">
            Home
          </Link>
          <Link className="nav-item nav-link text-center" to="/shelters">
            shelter list
          </Link>
          {!id && (
            <>
              <Link className="nav-item nav-link text-center" to="/login">
                login
              </Link>
              <Link className="nav-item nav-link text-center" to="/register">
                register
              </Link>
            </>
          )}
          {id && (
            <>
              <Link className="nav-item nav-link text-center" to="/newshelter">
                newshelter reg
              </Link>
              <Link className="nav-item nav-link text-center" to="/singleview">
                singleview
              </Link>
              <Link className="nav-item nav-link text-center" to="/my-shelters">
                MyShelters
              </Link>
              <Link className="nav-item nav-link text-center" to="/shelter">
                shelter
              </Link>
              <LogoutButton className="nav-item nav-link text-center"></LogoutButton>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
