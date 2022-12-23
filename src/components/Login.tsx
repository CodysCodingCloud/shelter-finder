import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    const token = window.localStorage.getItem('token');
    if (token) {
      navigate('/');
    }
  });

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //     await dispatch(
  //       attemptPsswordLogin({
  //         username: state.username,
  //         password: state.password,
  //       })
  //     );
  //     navigate('/');
  // };

  return (
    <div className="signinContainer">
      <form
        id="login-form"
        // onSubmit={}
      >
        <h1 className="signinTitle">SIGN IN</h1>
        <div className="login-line">
          <input
            className="login-input"
            placeholder="Email or Username"
            name="username"
            value={email}
            autoComplete="userName"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="login-line">
          <input
            placeholder="Password"
            className="login-input"
            name="password"
            type="password"
            value={password}
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="createAccount">
          <button className="signinBtn" type="submit">
            Sign In
          </button>
          <Link to="/register">
            <button className="registerBtn">Create account?</button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
