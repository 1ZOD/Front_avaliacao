import React from "react";

interface Props {
  label: string;
  placeholder: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({ label, placeholder, name, value, onChange }: Props) => {
  return (
    <div>
      <label className="label_input">{label}</label>
      <input
        className="input_field"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      ></input>
    </div>
  );
};

export default Input;
