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
  ) => (event: ChangeEvent<HTMLInputElement>) => void;
}
export default memo(function FormItem({
  id,
  text,
  type = 'text',
  handleChange,
  value,
  formChange,
  placeholder,
}: FormItemPorp) {
  return (
    <div className="form-item">
      <label htmlFor={id}>{text}</label>
      <input
        id={id}
        className="form-input"
        autoComplete={id}
        placeholder={placeholder ? placeholder : id}
        type={type}
        value={value}
        onChange={handleChange(formChange ? formChange : id)}
      />
    </div>
  );
});
