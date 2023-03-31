import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';
import LogoutButton from './LogoutButton';
export default function NavBar() {
  const id = useAppSelector((state) => state.user._id);
  // function toggle(e) {
  //   console.log(e.target);
  // }
  return (
    <nav className="navbar fixed-top navbar-light bg-light navbar-expand-md">
      <div className="container-fluid">
        <NavLink to="/" className="navbar-brand">
          <img src="/logo.svg" width="30" height="30" alt="shelter logo" />
          Shelter Finder
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="navbar-nav">
            {/* <li className="nav-item active"> */}
            <NavLink className="nav-item nav-link" to="/">
              Home
            </NavLink>
            <NavLink className="nav-item nav-link" to="/shelters">
              shelter list
            </NavLink>
            {!id && (
              <>
                <NavLink className="nav-item nav-link" to="/login">
                  login
                </NavLink>
                <NavLink className="nav-item nav-link" to="/register">
                  register
                </NavLink>
              </>
            )}
            {id && (
              <>
                <NavLink className="nav-item nav-link" to="/newshelter">
                  newshelter reg
                </NavLink>
                <NavLink className="nav-item nav-link" to="/singleview">
                  singleview
                </NavLink>
                <NavLink className="nav-item nav-link" to="/my-shelters">
                  MyShelters
                </NavLink>
                <NavLink className="nav-item nav-link" to="/shelter">
                  shelter
                </NavLink>
                <LogoutButton className="nav-item nav-link"></LogoutButton>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
