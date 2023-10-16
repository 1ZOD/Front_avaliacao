import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { format, addDays, differenceInDays } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';

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
  nome_tarefa: string;
  descricao: string;
  iconeBase64: string;
  hora_inicio: string;
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

  const [checkedItems, setCheckedItems] = useState<{ [key: number]: boolean }>({});

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

  const toggleCheckbox = (itemIndex: number) => {
    setCheckedItems((prevState) => ({
      ...prevState,
      [itemIndex]: !prevState[itemIndex],
    }));
  };

  const handleCheckAll = () => {
    const allChecked = Object.values(checkedItems).every((isChecked) => isChecked);

    if (allChecked) {
      const newCheckedItems = { ...checkedItems };
      for (const indexStr in apiData) {
        const index = parseInt(indexStr, 10);
        newCheckedItems[index] = false;
      }
      setCheckedItems(newCheckedItems);
    } else {
      const newCheckedItems = { ...checkedItems };
      for (const indexStr in apiData) {
        const index = parseInt(indexStr, 10);
        newCheckedItems[index] = true;
      }
      setCheckedItems(newCheckedItems);
    }
  };

  const visibleItems = items.slice(activeIndex, activeIndex + itemsPerPage);

  const sendToAPI = useCallback(async (selectedIndex: any) => {
    try {
      const response = await fetch('http://localhost:3001/dia', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data_inicio: items[selectedIndex].formattedDate.complete }),
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

  useEffect(() => {
    const initialCheckedItems: { [key: number]: boolean } = {};
    apiData.forEach((_, index) => {
      initialCheckedItems[index] = false;
    });
    setCheckedItems(initialCheckedItems);
  }, [apiData]);

  const handleDeleteCheckedItems = async () => {
    const itemsToDelete: number[] = [];
    for (const indexStr in checkedItems) {
      const index = parseInt(indexStr, 10);
      if (checkedItems[index]) {
        itemsToDelete.push(apiData[index].id);
      }
    }

    let requestData;
  
    if (itemsToDelete.length === 1) {
      requestData = {
        dia: format(new Date(), 'dd/MM/yyyy'),
        id: itemsToDelete[0].toString(),
      };
    } else if (itemsToDelete.length > 1) {
      const dias = itemsToDelete.map(() => format(new Date(), 'dd/MM/yyyy'));
      requestData = {
        dias: dias,
        ids: itemsToDelete.map(id => id.toString()),
      };
    } else {
      return;
    }
    try {
      const response = await fetch('http://localhost:3001/excluir', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });
  
      if (response.ok) {
        const updatedData = apiData.filter((item, index) => !checkedItems[index]);
        setApiData(updatedData);
  
        // Limpe os itens marcados
        const initialCheckedItems: { [key: number]: boolean } = {};
        updatedData.forEach((_, index) => {
          initialCheckedItems[index] = false;
        });
        setCheckedItems(initialCheckedItems);
      } else {
        console.error('Erro ao excluir os itens');
      }
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  return (
    <div>
      <div className="carousel-container">
        <button className="button_arrow" id="prevButton" onClick={handlePrev}>
          <FontAwesomeIcon icon={faChevronLeft} size="2xl" style={{ color: '#c1c9d7' }} />
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
        <button className="button_arrow" id="nextButton" onClick={handleNext}>
          <FontAwesomeIcon icon={faChevronRight} size="2xl" style={{ color: '#c1c9d7' }} />
        </button>
      </div>
      <div className="api-data">
        <button onClick={handleCheckAll}>Check All</button>
        <button onClick={handleDeleteCheckedItems}>Delete Checked Items</button>
        <div className="container-cinza-habitos">
          {apiData.map((item, index) => (
            <div className={`habito_item ${checkedItems[index] ? 'completed' : ''}`} key={index}>
              <div className='container-itens'>
                {checkedItems[index] ? (null) : (
                  <Image
                    className='icon'
                    src={`data:image/png;base64, ${item.iconeBase64}`}
                    alt="Ícone"
                    width="25"
                    height="25"
                  />
                )}
                <div className="text-container">
                  <p className={`title-item ${checkedItems[index] ? 'title-check' : ''}`}>{item.nome_tarefa}</p>
                  {checkedItems[index] ? (
                    <p className="sub-title-item">Completed</p>
                  ) : (
                    <p className="sub-title-item">{item.descricao}</p>
                  )}
                </div>
                <div className={`edit-container ${checkedItems[index] ? 'content-check' : ''}`}>
                  {checkedItems[index] ? null : (
                    <FontAwesomeIcon className='icone' icon={faPenToSquare} size="sm" style={{ color: '#a1a1aa' }} />
                  )}
                  <p className='horario-item'>{item.hora_inicio}</p>
                </div>
                <label className="custom-checkbox">
                  <input type="checkbox" onChange={() => toggleCheckbox(index)} checked={checkedItems[index]} />
                  <span className="checkmark">
                    <FontAwesomeIcon icon={faCheck} className="verified-icon" />
                  </span>
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MyComponent;
