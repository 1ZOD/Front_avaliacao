import React from "react";
import { format } from 'date-fns';



export const HomePage = () => {
  const today = new Date();
  const formattedDate = format(today, 'dd/MM');
  const dayOfWeek = format(today, 'EEEE');

  return (
    <div className="main-container-title-home">
        <div className="container-day">
            <div className="title-day">{dayOfWeek}</div>
            <div className="content-day">{formattedDate}</div>
        </div>
        <div className="container-day">
            <span>ICON</span>
            <span className="title-day">Hello, Barbára</span>
        </div>
    </div>
  );
};

export default HomePage;
