import React, { useState } from 'react';
import { format, subDays, addDays, isToday, differenceInDays } from 'date-fns';

function MyComponent() {
  const today = new Date();
  const numDays = 100; // Defina o número total de dias que você deseja exibir.
  const itemsPerPage = 6; // Defina o número de itens a serem exibidos por página.
  const daysBefore = 5; // Defina quantos dias antes do dia de hoje você deseja ver.

  const items = [];
  for (let i = -daysBefore; i < numDays; i++) {
    const day = addDays(today, i);
    items.push({
      date: day,
      formattedDate: format(day, 'dd EEE'),
    });
  }

  // Calcule o índice do dia atual (hoje)
  const todayIndex = differenceInDays(today, items[0].date);

  const [activeIndex, setActiveIndex] = useState(todayIndex);

  const handleNext = () => {
    setActiveIndex((prevIndex) =>
      prevIndex + 1 < numDays ? prevIndex + 1 : prevIndex
    );
  };

  const handlePrev = () => {
    setActiveIndex((prevIndex) =>
      prevIndex - 1 >= 0 ? prevIndex - 1 : prevIndex
    );
  };

  const visibleItems = items.slice(activeIndex, activeIndex + itemsPerPage);

  return (
    <div>
      <div className="carousel-container">
        <div className="carousel">
          {visibleItems.map((item, index) => (
            <div
              key={index}
              className={`carousel-item ${index === 0 ? 'active' : ''}`}
            >
              {item.formattedDate}
            </div>
          ))}
        </div>
        <button id="prevButton" onClick={handlePrev}>
          Anterior
        </button>
        <button id="nextButton" onClick={handleNext}>
          Próximo
        </button>
      </div>
    </div>
  );
}

export default MyComponent;
