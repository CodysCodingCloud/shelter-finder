import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
// import { useNavigate } from 'react-router-dom';
// import { createUser } from '../store/userSlice';

export default function ShelterForm() {
  const user = useAppSelector((state) => state.user);
  // const dispatch = useAppDispatch();
  // const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    addressLine1: '',
    addressLine2: '',
    stateAbbreviation: '',
    postal: '',
    phone: '',
    openSpace: '',
    capacity: '',
    description: '',
    requirements: '',
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
      !form.name.length ||
      !form.addressLine1.length ||
      !form.stateAbbreviation.length ||
      !form.postal.length ||
      !form.openSpace.length ||
      !form.capacity.length
    );
  };

  return (
    <div className="form-container">
      {!user.email ? (
        <form id="registration-form" onSubmit={handleSubmit}>
          <div className="form-title">Register a new Shelter</div>
          <div className="form-item">
            <input
              className="form-input"
              placeholder="name"
              type="text"
              value={form.name}
              onChange={handleChange('name')}
            />
          </div>
          <div className="form-item">
            <input
              className="form-input"
              placeholder="addressLine1"
              type="text"
              autoComplete="street-address"
              value={form.addressLine1}
              onChange={handleChange('addressLine1')}
            />
          </div>
          <div className="form-item">
            <input
              className="form-input"
              placeholder="addressLine2"
              type="text"
              value={form.addressLine2}
              onChange={handleChange('addressLine2')}
            />
          </div>
          <div className="form-item">
            <input
              className="form-input"
              placeholder="stateAbbreviation"
              type="text"
              autoComplete="state"
              value={form.stateAbbreviation}
              onChange={handleChange('stateAbbreviation')}
            />
          </div>
          <div className="form-item">
            <input
              className="form-input"
              placeholder="postal"
              autoComplete="postal-code"
              type="number"
              value={form.postal}
              onChange={handleChange('postal')}
            />
          </div>
          <div className="form-item">
            <input
              className="form-input"
              placeholder="phone number"
              autoComplete="tel-national"
              type="number"
              value={form.phone}
              onChange={handleChange('phone')}
            />
          </div>
          <div className="form-item">
            <input
              className="form-input"
              placeholder="Open space"
              type="number"
              value={form.openSpace}
              onChange={handleChange('openSpace')}
            />
          </div>
          <div className="form-item">
            <input
              className="form-input"
              placeholder="capacity"
              type="number"
              value={form.capacity}
              onChange={handleChange('capacity')}
            />
          </div>
          <div className="form-item">
            <input
              className="form-input"
              type="text"
              value={form.description}
              onChange={handleChange('description')}
            />
          </div>
          <div className="form-item">
            <input
              className="form-input"
              type="text"
              value={form.capacity}
              onChange={handleChange('requirements')}
            />
          </div>
          <button
            className="form-button"
            type="submit"
            disabled={checkDisabled()}
          >
            Register Shelter
          </button>
        </form>
      ) : (
        <div>Please log in or create an account add a new shelter</div>
      )}
    </div>
  );
}
