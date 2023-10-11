import React, { ReactNode } from "react";

interface Props{
  children: ReactNode;
}

export const Title = ({children}: Props) => {
  return (
    <div className="title">{children}</div>
  );
};
;