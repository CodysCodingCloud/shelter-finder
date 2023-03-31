import React, { MouseEvent, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';
import LogoutButton from './LogoutButton';

export default function NavBar() {
  const id = useAppSelector((state) => state.user._id);
  const navRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  function collapser(event: MouseEvent<HTMLDivElement>) {
    console.log(event.target);
    if (navRef.current) {
      navRef.current.classList.remove('show');
    }
    if (btnRef.current) {
      btnRef.current.classList.add('collapsed');
    }
  }
  return (
    <nav className="navbar bg-light navbar-expand-md">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          <img src="/logo.svg" width="30" height="30" alt="shelter logo" />
          Shelter Finder
        </Link>

        <button
          ref={btnRef}
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

        <div
          ref={navRef}
          className="collapse navbar-collapse"
          id="navbarNavAltMarkup"
          onClick={collapser}
        >
          <div className="navbar-nav">
            <NavLink className="nav-link" to="/">
              Home
            </NavLink>
            <NavLink className="nav-link" to="/shelters">
              shelter list
            </NavLink>
            {!id && (
              <>
                <NavLink className="nav-link" to="/login">
                  login
                </NavLink>
                <NavLink className="nav-link" to="/register">
                  register
                </NavLink>
              </>
            )}
            {id && (
              <>
                <NavLink className="nav-link" to="/newshelter">
                  Register Shelter
                </NavLink>
                {/* <NavLink className="nav-link" to="/singleview">
                  singleview
                </NavLink> */}
                <NavLink className="nav-link" to="/my-shelters">
                  MyShelters
                </NavLink>
                <NavLink className="nav-link" to="/shelter">
                  shelter
                </NavLink>
                <LogoutButton className="nav-link"></LogoutButton>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
