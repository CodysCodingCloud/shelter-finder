import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
// import { useNavigate } from 'react-router-dom';
// import { createUser } from '../store/userSlice';
import { IShelter } from '../../../serversrc/db/Shelter';
import FormItem from './FormItem';
// import { FormItemPorp } from './FormItem';

export default function ShelterForm() {
  const user = useAppSelector((state) => state.user);
  // const dispatch = useAppDispatch();
  // const navigate = useNavigate();

  const [form, setForm] = useState({
    // user: user._id,
    name: '',
    organization: '',
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
  const [formError, setFormError] = useState({});
  const [disableForm, setDisableForm] = useState(true);

  const handleChange =
    (props: string) =>
    (event: ChangeEvent<HTMLInputElement>): void => {
      setForm((prev) => {
        return {
          ...prev,
          [props]: event.target.value,
        };
      });
      checkDisabled();
    };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      !form.name ||
      !form.organization ||
      !form.addressLine1 ||
      !form.stateAbbreviation ||
      !form.postal ||
      !form.phone ||
      !form.capacity
    ) {
      setFormError({ ...formError, incomplete: 'please complete the form' });
      return;
    }
    // console.log(user['_id']);
  };

  const checkDisabled = () => {
    if (
      !form.name ||
      !form.addressLine1 ||
      !form.organization ||
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
          <FormItem
            id="organization"
            text="organization"
            handleChange={handleChange}
            value={form.organization}
          />
          <FormItem
            id="address-line1"
            text="Address line 1"
            formChange="addressLine1"
            handleChange={handleChange}
            value={form.addressLine1}
          />
          <FormItem
            id="address-line2"
            text="Address line 2"
            formChange="addressLine2"
            handleChange={handleChange}
            value={form.addressLine2}
          />
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
              <option value="" defaultValue="" hidden></option>
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
          <FormItem
            id="postal-code"
            text="postal"
            type="number"
            formChange="postal"
            handleChange={handleChange}
            value={form.postal}
          />
          <FormItem
            id="tel-national"
            text="contact information<"
            type="tel"
            placeholder="phone number"
            formChange="phone"
            handleChange={handleChange}
            value={form.phone}
          />
          <FormItem
            id="capacity"
            text="what is the maximum capacity in this shelter?"
            handleChange={handleChange}
            value={form.capacity}
          />{' '}
          <FormItem
            id="openSpace"
            text="how much space is left in this shelter?"
            handleChange={handleChange}
            value={form.openSpace}
          />
          <FormItem
            id="description"
            text="Tell me more about this shelter (This will be desplayed as your shelter's description)"
            handleChange={handleChange}
            value={form.description}
          />
          <FormItem
            id="requirements"
            text="are there any requirements in order to enter this shelter?"
            handleChange={handleChange}
            value={form.requirements}
          />
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
