import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { format, addDays, differenceInDays } from 'date-fns';

type Item = {
  date: Date;
  formattedDate: {
    dd: string;
    eee: string;
    complete: string;
  };
};

type ApiDataItem = {
  id: number;
  tarefa: string;
  status: string;
};

function MyComponent() {
  const numDays = 100;
  const itemsPerPage = 10;
  const daysBefore = 5;

  const [apiData, setApiData] = useState<ApiDataItem[]>([]);

  const today = useMemo(() => new Date(), []);

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

  const sendToAPI = useCallback(async (selectedIndex: any) => {
    try {
      const response = await fetch('http://localhost:3001/dia', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ dia: items[selectedIndex].formattedDate.complete }), // Valor vazio
      });

      if (response.ok) {
        const data = await response.json();
        setApiData(data);
      } else {
        console.error('Erro ao chamar a API');
      }
    } catch (error) {
      console.error('Erro:', error);
    }
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
      <div className="api-data">
        <div className="container-cinza-habitos">
          {apiData.map((item, index) => (
            <div className="habito_item" key={index}>
              <div>{item.tarefa}</div>
              {/* <p>{item.status}</p> */}
            </div>
          ))}

        </div>

      </div>
    </div>
  );
}

export default MyComponent;
