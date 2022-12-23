import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { useNavigate } from 'react-router-dom';
// import { createUser } from '../store/userSlice';

export default function Register() {
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  // const navigate = useNavigate();
  const [form, setForm] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  });

  const handleChange = (props: string) => (event: any) => {
    setForm({
      ...form,
      [props]: event.target.value,
    });
  };

  const handleSubmit = async () => {};

  const checkDisabled = () => {
    return (
      !form.email.length ||
      !form.password.length ||
      !form.firstName.length ||
      !form.lastName.length
    );
  };

  return !user.email ? (
    <form id="create-account-container" onSubmit={handleSubmit}>
      <div id="create-account-form">
        <h1 className="createAccounttitle">Create New Account</h1>
        <div className="form-line">
          <input
            className="login-input"
            placeholder="Email address"
            type="email"
            value={form.email}
            onChange={handleChange('email')}
          />
        </div>
        <div className="form-line">
          <input
            className="login-input"
            placeholder="Password"
            type="password"
            value={form.password}
            onChange={handleChange('password')}
          />
        </div>

        <div className="form-line">
          <input
            className="login-input"
            placeholder="First name"
            type="text"
            value={form.firstName}
            onChange={handleChange('firstName')}
          />
        </div>
        <div className="form-line">
          <input
            className="login-input"
            placeholder="Last name"
            type="text"
            value={form.lastName}
            onChange={handleChange('lastName')}
          />
        </div>
        <button
          className="createAccountBtn"
          type="submit"
          disabled={checkDisabled()}
        >
          Create Account
        </button>
      </div>
    </form>
  ) : (
    <div>Cannot create account when already logged in</div>
  );
}
