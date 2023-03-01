import React, { useState, useCallback, ChangeEvent, FormEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
// import { useNavigate } from 'react-router-dom';
import { IShelter } from '../../../serversrc/db/Shelter';
import FormItem from './FormItem';
import { createShelter, updateShelter } from '../store/reducers/shelterSlice';
import AvatarFormItem from './AvatarFormItem';

export default function ShelterForm() {
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  // const navigate = useNavigate();

  const [form, setForm] = useState({
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
    avatar: '',
  });
  const [formError, setFormError] = useState({});
  const [disableForm, setDisableForm] = useState(true);

  const checkDisabled = useCallback(() => {
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
  }, [form]);

  const handleChange = useCallback(
    (props: string) =>
      (
        event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
      ): void => {
        setForm((prev) => {
          return {
            ...prev,
            [props]: event.target.value,
          };
        });
        console.log(form);

        checkDisabled();
      },
    [checkDisabled]
  );

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
    dispatch(createShelter(form, user._id as string));
    console.log('userinfo', user._id);

    // console.log(user['_id']);
  };

  return (
    <div className="container">
      {user.email ? (
        <form id="registration-form" onSubmit={handleSubmit}>
          <div className="form-title">Register a new Shelter</div>
          <FormItem
            id="name"
            text="name"
            handleChange={handleChange}
            value={form.name}
          />
          <AvatarFormItem form={form} setForm={setForm} />
          <FormItem
            id="organization"
            text="Organization"
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
          <FormItem
            id="stateAbbreviation"
            autoComplete="state"
            text="State"
            type="select"
            formChange="stateAbbreviation"
            handleChange={handleChange}
            value={form.stateAbbreviation}
            slectArr={require('../util/usStates.json')}
            selectText="name"
            selectValue="abbreviation"
          />
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
            placeholder="(###)###-####"
            formChange="phone"
            handleChange={handleChange}
            value={form.phone}
          />
          <FormItem
            id="capacity"
            type="number"
            text="what is the maximum capacity in this shelter?"
            handleChange={handleChange}
            value={form.capacity}
          />
          <FormItem
            id="openSpace"
            type="number"
            text="how much space is left in this shelter?"
            handleChange={handleChange}
            value={form.openSpace}
          />
          <FormItem
            id="description"
            text="Tell me more about this shelter (This will be desplayed as your shelter's description)"
            type="textarea"
            handleChange={handleChange}
            value={form.description}
          />
          <FormItem
            id="requirements"
            text="are there any requirements in order to enter this shelter?"
            type="textarea"
            handleChange={handleChange}
            value={form.requirements}
          />
          <button
            className={
              'form-button btn btn-primary'
              // + disableForm ? ' disabled' : ''
            }
            type="submit"
            disabled={disableForm}
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
