import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
// import { useNavigate } from 'react-router-dom';
// import { createUser } from '../store/userSlice';

export default function Register() {
  const user = useAppSelector((state) => state.user);
  // const dispatch = useAppDispatch();
  // const navigate = useNavigate();
  const [form, setForm] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  });

  const handleChange =
    (props: string) =>
    (event: ChangeEvent<HTMLInputElement>): void => {
      setForm({
        ...form,
        [props]: event.target.value,
      });
    };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const checkDisabled = () => {
    return (
      !form.email.length ||
      !form.password.length ||
      !form.firstName.length ||
      !form.lastName.length
    );
  };

  return (
    <div className="form-container">
      {!user.email ? (
        <form id="registration-form" onSubmit={handleSubmit}>
          <div className="form-title">Register a new account</div>
          <div className="form-item">
            <input
              className="form-input"
              placeholder="Email address"
              type="email"
              value={form.email}
              onChange={handleChange('email')}
            />
          </div>
          <div className="form-item">
            <input
              className="form-input"
              placeholder="Password"
              type="password"
              value={form.password}
              onChange={handleChange('password')}
            />
          </div>

          <div className="form-item">
            <input
              className="form-input"
              placeholder="First name"
              type="text"
              value={form.firstName}
              onChange={handleChange('firstName')}
            />
          </div>
          <div className="form-item">
            <input
              className="form-input"
              placeholder="Last name"
              type="text"
              value={form.lastName}
              onChange={handleChange('lastName')}
            />
          </div>
          <button
            className="form-button"
            type="submit"
            disabled={checkDisabled()}
          >
            Create Account
          </button>
        </form>
      ) : (
        <div>Cannot create account when already logged in</div>
      )}
    </div>
  );
}
