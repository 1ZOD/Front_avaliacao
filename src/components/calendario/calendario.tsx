import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { format, subDays, addDays, differenceInDays } from 'date-fns';

type Item = {
  date: Date;
  formattedDate: {
    dd: string;
    eee: string;
    complete: string;
  };
};

function MyComponent() {
  const numDays = 100;
  const itemsPerPage = 10;
  const daysBefore = 5;

  // Use useMemo para criar a variável today
  const today = useMemo(() => new Date(), []);

  // Use useMemo para criar o array items
  const items: Item[] = useMemo(() => {
    const itemsArray = [];

    for (let i = -daysBefore; i < numDays; i++) {
      const day = addDays(today, i);
      itemsArray.push({
        date: day,
        formattedDate: {
          dd: format(day, 'dd'),
          eee: format(day, 'eee'),
          complete: format(day, 'dd/MM/yyyy'),
        },
      });
    }

    return itemsArray;
  }, [today, numDays, daysBefore]);

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

  // Define a função sendToAPI usando useCallback
  const sendToAPI = useCallback((selectedIndex: number) => {
    // Substitua esta parte pelo código para enviar os dados para a API
    console.log('Enviando para a API:', items[selectedIndex].formattedDate.complete);
  }, [items]);

  useEffect(() => {
    sendToAPI(activeIndex);
  }, [activeIndex, sendToAPI]);

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
