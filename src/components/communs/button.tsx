import React from "react";

interface Props{
  children: any;
}

export const Button = ({children}: Props) => {
  return (
    <button className="button">{children}</button>
  );
};

export default Button;