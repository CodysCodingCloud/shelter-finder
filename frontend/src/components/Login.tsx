import { log } from 'console';
import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { attemptPasswordLogin } from '../store/reducers/userSlice';

export default function SignIn() {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [formError, setFormError] = useState({});

  const handleChange =
    (props: string) =>
    (event: ChangeEvent<HTMLInputElement>): void => {
      let value = event.target.value;
      setForm({
        ...form,
        [props]: value,
      });
    };
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError({});
    if (!form.email) {
      setFormError({ ...formError, email: 'please enter an email address' });
      return;
    }
    if (!form.password) {
      setFormError({ ...formError, password: 'please enter your password' });
      return;
    }
    dispatch(attemptPasswordLogin(form));
  };
  const user = useAppSelector((state) => state.user);
  useEffect(() => {
    if (user.email) {
      navigate('/');
    }
  }, [user, navigate]);
  return (
    <div className="form-container">
      <form id="login-form" onSubmit={(e) => handleSubmit(e)}>
        <div className="form-title">Login shelter system</div>
        <div className="form-item">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            autoComplete="email"
            className="form-input"
            placeholder="Enter your email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange('email')}
          />
        </div>
        <div className="form-item">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            className="form-input form-control"
            placeholder="Enter your password"
            name="password"
            autoComplete="current-password"
            type="password"
            value={form.password}
            onChange={handleChange('password')}
          />
        </div>
        <div className="form-button">
          <button type="submit">Login</button>
        </div>
        <div className="form-button">
          <Link to="/register">No account? Sign up now!</Link>
        </div>
      </form>
    </div>
  );
}
