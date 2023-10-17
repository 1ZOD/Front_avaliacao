import React from "react";
import { format } from 'date-fns';



export const HomePageContent = () => {
  const today = new Date();
  const formattedDate = format(today, 'dd/MM');
  const dayOfWeek = format(today, 'EEEE');

  return (
    <div className="main-container-content">
        <div className="container-esquerdo">
            <span className="title-esquerdo">Follow your Habits</span>
            <div className="content-esquerdo">Grafico</div>
        </div>
        <div className="container-direito">
            <div></div>
        </div>
    </div>
  );
};

export default HomePageContent;
