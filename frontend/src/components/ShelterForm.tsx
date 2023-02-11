import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
// import { useNavigate } from 'react-router-dom';
// import { createUser } from '../store/userSlice';
// import { IShelter } from '../../../serversrc/db/Shelter';

export default function ShelterForm() {
  const user = useAppSelector((state) => state.user);
  // const dispatch = useAppDispatch();
  // const navigate = useNavigate();

  const [form, setForm] = useState({
    // user:user.id,
    name: '',
    organization: '',
    addressLine1: '',
    addressLine2: '',
    stateAbbreviation: '',
    postal: '',
    phone: '',
    // openSpace: '',
    // capacity: '',
    description: '',
    requirements: '',
  });
  const [formError, setFormError] = useState({});
  const [disableForm, setDisableForm] = useState(true);

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
    if (
      !form.name ||
      !form.addressLine1 ||
      !form.stateAbbreviation ||
      !form.postal ||
      !form.phone ||
      !form.capacity ||
      !form.description ||
      !form.requirements
    ) {
      setFormError({ ...formError, password: 'please complete the form' });
      return;
    }
  };

  const checkDisabled = () => {
    if (
      !form.name ||
      !form.addressLine1 ||
      !form.stateAbbreviation ||
      !form.postal ||
      !form.capacity
    ) {
      setDisableForm(true);
    } else {
      setDisableForm(false);
    }
  };

  return (
    <div className="form-container">
      {user.email ? (
        <form id="registration-form" onSubmit={handleSubmit}>
          <div className="form-title">Register a new Shelter</div>
          <div className="form-item">
            <label htmlFor="name">name</label>
            <input
              id="name"
              className="form-input"
              placeholder="name"
              type="text"
              value={form.name}
              onChange={handleChange('name')}
            />
          </div>
          <div className="form-item">
            <label htmlFor="addressLine1">addressLine1</label>
            <input
              id="addressLine1"
              className="form-input"
              placeholder="addressLine1"
              type="text"
              autoComplete="street-address"
              value={form.addressLine1}
              onChange={handleChange('addressLine1')}
            />
          </div>
          <div className="form-item">
            <label htmlFor="addressLine2">addressLine2</label>
            <input
              id="addressLine2"
              className="form-input"
              placeholder="addressLine2"
              type="HTMLSelectElement"
              value={form.addressLine2}
              onChange={handleChange('addressLine2')}
            />
          </div>
          <div className="form-item">
            <label htmlFor="stateAbbreviation">State</label>
            <select
              id="stateAbbreviation"
              className="form-input"
              autoComplete="state"
              value={form.stateAbbreviation}
              onChange={(event) => {
                setForm({
                  ...form,
                  stateAbbreviation: event.target.value,
                });
              }}
            >
              <option value="" selected hidden></option>
              <option value="AL">AL</option>
              <option value="AK">AK</option>
              <option value="AR">AR</option>
              <option value="AZ">AZ</option>
              <option value="CA">CA</option>
              <option value="CO">CO</option>
              <option value="CT">CT</option>
              <option value="DC">DC</option>
              <option value="DE">DE</option>
              <option value="FL">FL</option>
              <option value="GA">GA</option>
              <option value="HI">HI</option>
              <option value="IA">IA</option>
              <option value="ID">ID</option>
              <option value="IL">IL</option>
              <option value="IN">IN</option>
              <option value="KS">KS</option>
              <option value="KY">KY</option>
              <option value="LA">LA</option>
              <option value="MA">MA</option>
              <option value="MD">MD</option>
              <option value="ME">ME</option>
              <option value="MI">MI</option>
              <option value="MN">MN</option>
              <option value="MO">MO</option>
              <option value="MS">MS</option>
              <option value="MT">MT</option>
              <option value="NC">NC</option>
              <option value="NE">NE</option>
              <option value="NH">NH</option>
              <option value="NJ">NJ</option>
              <option value="NM">NM</option>
              <option value="NV">NV</option>
              <option value="NY">NY</option>
              <option value="ND">ND</option>
              <option value="OH">OH</option>
              <option value="OK">OK</option>
              <option value="OR">OR</option>
              <option value="PA">PA</option>
              <option value="RI">RI</option>
              <option value="SC">SC</option>
              <option value="SD">SD</option>
              <option value="TN">TN</option>
              <option value="TX">TX</option>
              <option value="UT">UT</option>
              <option value="VT">VT</option>
              <option value="VA">VA</option>
              <option value="WA">WA</option>
              <option value="WI">WI</option>
              <option value="WV">WV</option>
              <option value="WY">WY</option>
            </select>
          </div>
          <div className="form-item">
            <label htmlFor="postal">postal</label>
            <input
              id="postal"
              className="form-input"
              placeholder="postal"
              autoComplete="postal-code"
              type="number"
              value={form.postal}
              onChange={handleChange('postal')}
            />
          </div>
          <div className="form-item">
            <label htmlFor="phone_number">contact information</label>
            <input
              id="phone_number"
              className="form-input"
              placeholder="phone number"
              autoComplete="tel-national"
              type="number"
              value={form.phone}
              onChange={handleChange('phone')}
            />
          </div>
          <div className="form-item">
            <label htmlFor="capacity">
              what is the maximum capacity in this shelter?
            </label>
            <input
              id="capacity"
              className="form-input"
              placeholder="capacity"
              type="number"
              value={Number(form.capacity)}
              onChange={handleChange('capacity')}
            />
          </div>{' '}
          <div className="form-item">
            <label htmlFor="openSpace">
              how much space is left in this shelter?
            </label>
            <input
              id="openSpace"
              className="form-input"
              placeholder="Open space"
              type="number"
              value={Number(form.openSpace)}
              onChange={handleChange('openSpace')}
            />
          </div>
          <div className="form-item">
            <label htmlFor="description">tell me more about this shelter</label>
            <input
              id="description"
              className="form-input"
              type="text"
              value={form.description}
              onChange={handleChange('description')}
            />
          </div>
          <div className="form-item">
            <label htmlFor="requirements">
              are there any requirements in order to enter this shelter?
            </label>
            <input
              id="requirements"
              className="form-input"
              type="text"
              value={form.requirements}
              onChange={handleChange('requirements')}
            />
          </div>
          <button className="form-button" type="submit" disabled={disableForm}>
            Register Shelter
          </button>
        </form>
      ) : (
        <div>Please log in or create an account add a new shelter</div>
      )}
    </div>
  );
}
