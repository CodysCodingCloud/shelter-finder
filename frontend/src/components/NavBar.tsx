import React from 'react';
import { Link, NavLink } from 'react-router-dom';
// import { useAppDispatch, useAppSelector } from '../store/hooks';

export default function NavBar() {
  // const user = useAppSelector((state) => state.user);

  return (
    <div className="navBar">
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
        </div>
      </div>
    </div>
  );
}
