import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { format, addDays, differenceInDays } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import { useRouter } from 'next/router';

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
  status: 'Aberto' | 'concluido';
};

function MyComponent() {
  const numDays = 100;
  const itemsPerPage = 10;
  const daysBefore = 5;
  const router = useRouter();

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

  const [totalDays, setTotalDays] = useState(0);
  const [completedDays, setCompletedDays] = useState(0);

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

  const toggleCheckbox = async (itemIndex: number) => {
    const updatedApiData = [...apiData]; // Crie uma cópia do array de dados da API.
    const item = updatedApiData[itemIndex];
    const newStatus = item.status === 'concluido' ? 'Aberto' : 'concluido'; // Inverta o status.
  
    // Atualize o status no array de dados da API e no estado local.
    updatedApiData[itemIndex] = { ...item, status: newStatus };
    setApiData(updatedApiData);
  
    const itemId = item.id;
    try {
      const response = await fetch(`http://localhost:3001/concluir_habito/${itemId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });
    } catch (error) {
      console.error('Erro:', error);
    }
    updateCompletedDays();
  };

  const handleEditItem = (index: number) => {
    if (apiData[index]) {
      const itemId = apiData[index].id;
      router.push(`/new_habbit/${itemId}`);
    }
  };

  const handleCheckAll = async () => {
    const allChecked = Object.values(checkedItems).every((isChecked) => isChecked);
    const newStatus = allChecked ? 'Aberto' : 'concluido';
  
    // Crie um array de promessas para todas as atualizações de status
    const updatePromises = apiData.map(async (item, index) => {
      if (checkedItems[index] !== (newStatus === 'concluido')) {
        try {
          const response = await fetch(`http://localhost:3001/concluir_habito/${item.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status: newStatus }),
          });
          if (response.ok) {
            // Atualize o estado local para refletir o novo status
            const updatedApiData = [...apiData];
            updatedApiData[index] = { ...item, status: newStatus };
            setApiData(updatedApiData);
            // Atualize o estado local dos itens marcados
            const newCheckedItems = { ...checkedItems };
            newCheckedItems[index] = newStatus === 'concluido';
            setCheckedItems(newCheckedItems);
          } else {
            console.error('Erro ao atualizar o status');
          }
        } catch (error) {
          console.error('Erro:', error);
        }
      }
    });
  
    // Aguarde todas as promessas serem resolvidas
    await Promise.all(updatePromises);
  
    // Atualize o contador de dias completos
    updateCompletedDays();
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

  const updateCompletedDays = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:3001/contagem', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: items[activeIndex].formattedDate.complete }),
      });

      if (response.ok) {
        const data = await response.json();
        setTotalDays(data.totalTarefas);
        setCompletedDays(data.tarefasConcluidas);
      } else {
        console.error('Erro ao buscar dados de contagem');
      }
    } catch (error) {
      console.error('Erro:', error);
    }
  }, [items, activeIndex]);

  useEffect(() => {
    sendToAPI(activeIndex);
    updateCompletedDays();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex, sendToAPI]);

  useEffect(() => {
    const initialCheckedItems: { [key: number]: boolean } = {};
    apiData.forEach((_, index) => {
      initialCheckedItems[index] = false;
    });
    setCheckedItems(initialCheckedItems);
  }, [apiData]);

  const handleDeleteCheckedItems = async () => {
    const requestData = {
      dia: items[activeIndex].formattedDate.complete,
    };
  
    try {
      const response = await fetch('http://localhost:3001/excluir-concluidas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });
  
      if (response.ok) {
        const updatedData = apiData.filter((item, index) => !checkedItems[index]);
        setApiData(updatedData);
  
        const initialCheckedItems: { [key: number]: boolean } = {};
        updatedData.forEach((_, index) => {
          initialCheckedItems[index] = false;
        });
        setCheckedItems(initialCheckedItems);
        updateCompletedDays();
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
        <div className='container-mark-top'>
          <div className='container-subitle'>
            <button className="mark-completed" onClick={handleCheckAll}>
              <FontAwesomeIcon icon={faCheck}/> Mark as completed
            </button>
            <button className="mark-completed" onClick={handleDeleteCheckedItems}>
              <FontAwesomeIcon icon={faXmark}/> Delete Checked Items
            </button>
          </div>
          <div className="days-count">
            {completedDays}/{totalDays} completed
          </div>
        </div>
        <div className="container-cinza-habitos">
        {apiData.map((item, index) => (
              <div className={`habito_item ${item.status === 'concluido' ? 'completed' : ''}`} key={index}>
                <div className='container-itens'>
                  {item.status === 'concluido' ? null : (
                    <Image
                      className='icon'
                      src={`data:image/png;base64, ${item.iconeBase64}`}
                      alt="Ícone"
                      width="25"
                      height="25"
                    />
                  )}
                  <div className="text-container">
                    <p className={`title-item ${item.status === 'concluido' ? 'title-check' : ''}`}>{item.nome_tarefa}</p>
                    {item.status === 'concluido' ? (
                      <p className="sub-title-item">Completed</p>
                    ) : (
                      <p className="sub-title-item">{item.descricao}</p>
                    )}
                  </div>
                  <div className={`edit-container ${item.status === 'concluido' ? 'content-check' : ''}`}>
                    {item.status === 'concluido' ? null : (
                      <button className='icone-edit' onClick={() => handleEditItem(index)}>
                        <FontAwesomeIcon icon={faPenToSquare} size="sm" style={{ color: '#a1a1aa' }} />
                      </button>
                    )}
                    <p className='horario-item'>{item.hora_inicio}</p>
                  </div>
                  <label className="custom-checkbox">
                    <input type="checkbox" onChange={() => toggleCheckbox(index)} checked={item.status === 'concluido' || checkedItems[index]} />
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
