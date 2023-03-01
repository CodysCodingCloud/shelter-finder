import React, { ChangeEvent, memo } from 'react';

export interface FormItemPorp {
  id: string;
  text: string;
  type?: string;
  placeholder?: string;
  value: string;
  formChange?: string;
  handleChange: (
    props: string
  ) => (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => void;
  children?: JSX.Element;
  autoComplete?: string;
  slectArr?: any[];
  selectText?: string;
  selectValue?: string;
}

export default memo(function FormItem({
  id,
  text,
  type = 'text',
  handleChange,
  value,
  formChange,
  placeholder,
  children,
  autoComplete,
  slectArr,
  selectText,
  selectValue,
}: FormItemPorp) {
  return (
    <div className="form-item row mb-3">
      <label htmlFor={id} className="form-label col">
        {text}
      </label>
      {type === 'select' ? (
        <select
          id={id}
          className="form-input col form-select-sm"
          value={value}
          autoComplete={autoComplete}
          onChange={handleChange(formChange ? formChange : id)}
        >
          <option value="" defaultValue="" hidden></option>
          {slectArr?.map((state) => (
            <option
              key={state[selectValue as string]}
              value={state[selectValue as string]}
            >
              {state[selectText as string]}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={id}
          className="form-input col form-control"
          autoComplete={id}
          placeholder={placeholder ? placeholder : ''}
          type={type}
          value={value}
          onChange={handleChange(formChange ? formChange : id)}
        />
      )}

      {children}
    </div>
  );
});
