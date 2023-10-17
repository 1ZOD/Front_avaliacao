import React from "react";
import { format } from 'date-fns';



export const HomePageContent = () => {
  const today = new Date();
  const formattedDate = format(today, 'dd/MM');
  const dayOfWeek = format(today, 'EEEE');

  return (
    <div className="main-container-content">
      <div className="container">
        <div className="container-esquerdo">
            <span className="title-esquerdo">Follow your Habits</span>
            <div className="content-esquerdo">Grafico</div>
        </div>
                <span>All habits</span>
      </div>
      <div className="container">
        <div className="container-direito">
          <div className="title-esquerdo">Top 3 Habits</div>
          <div className="grid-3">
            <span className="firt-content">Drink Water</span>
            <div className="grid-2-itens">
              <div className="second-place">
                <span>Study</span>
              </div>
              <div className="last-place">
                <span>Eat Fruit</span>
              </div>
            </div>
          </div>
        </div>
          <span>+ New habit</span>
      </div>
    </div>
  );
};

export default HomePageContent;
