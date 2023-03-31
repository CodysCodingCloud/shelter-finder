import React from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';
import LogoutButton from './LogoutButton';

export default function NavBar() {
  const id = useAppSelector((state) => state.user._id);
  // function toggle(e) {
  //   console.log(e.target);
  // }
  return (
    <nav className="navbar bg-light navbar-expand-md">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          <img src="/logo.svg" width="30" height="30" alt="shelter logo" />
          Shelter Finder
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link className="nav-link" to="/">
              Home
            </Link>
            <Link className="nav-link" to="/shelters">
              shelter list
            </Link>
            {!id && (
              <>
                <Link className="nav-link" to="/login">
                  login
                </Link>
                <Link className="nav-link" to="/register">
                  register
                </Link>
              </>
            )}
            {id && (
              <>
                <Link className="nav-link" to="/newshelter">
                  Register Shelter
                </Link>
                {/* <Link className="nav-link" to="/singleview">
                  singleview
                </Link> */}
                <Link className="nav-link" to="/my-shelters">
                  MyShelters
                </Link>
                <Link className="nav-link" to="/shelter">
                  shelter
                </Link>
                <LogoutButton className="nav-link"></LogoutButton>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
