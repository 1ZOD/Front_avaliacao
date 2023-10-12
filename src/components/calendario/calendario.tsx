import React, { useState } from 'react';
import { format, subDays, addDays, isToday, differenceInDays } from 'date-fns';

function MyComponent() {
  const today = new Date();
  const numDays = 100;
  const itemsPerPage = 10;
  const daysBefore = 5;

  const items = [];
  for (let i = -daysBefore; i < numDays; i++) {
    const day = addDays(today, i);
    items.push({
      date: day,
      formattedDate: {
        dd: format(day, 'dd'),
        eee: format(day, 'eee'),
        complete: format(day, 'dd MMMM yyyy'),
      },
    });
  }

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
        <button id="prevButton" onClick={handlePrev}>
          Anterior
        </button>
        <div className="carousel">
          {visibleItems.map((item, index) => (
            <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
              <div>
                <p>{item.formattedDate.eee}</p>
                <p>{item.formattedDate.dd}</p>
              </div>
            </div>
          ))}
        </div>
        <button id="nextButton" onClick={handleNext}>
          Próximo
        </button>
      </div>
    </div>
  );
}

export default MyComponent;
