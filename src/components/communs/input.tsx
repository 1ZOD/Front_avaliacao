import React from "react";

interface Props {
  label: any;
  placehloder: any,
}

export const Input = ({ label,placehloder }: Props) => {
  return (
    <>
      <label className="label_input">{label}</label>
      <input className="input_field" placeholder={placehloder}></input>
    </>
  );
};
