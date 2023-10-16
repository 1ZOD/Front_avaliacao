import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { Title } from "@/components/communs/title";
import IconField from "@/components/communs/icons";
import { Time } from "@/components/communs/time";
import { Dropdown } from "@/components/communs/dropdown";
import { Date } from "@/components/communs/date";
import Input from "@/components/communs/input";
import Swal from 'sweetalert2';
import router, { useRouter } from 'next/router';

export default function New_habit() {
  const [formData, setFormData] = useState({
    nome_tarefa: "",
    descricao: "",
    status: "Aberto",
    icone_nome: "",
    data_inicio: "",
    data_fim: "",
    hora_inicio: "",
    hora_fim: "",
    repetir: "During a Week",
    notificacao: "no",
  });

  const router = useRouter();
  const { id } = router.query; // Pega o valor do parâmetro "id" da URL

  useEffect(() => {
    if (id) {
      // Se "id" estiver presente na URL, é uma página de edição, então você pode buscar os dados do hábito com esse "id" e preencher o formulário.
      const fetchData = async () => {
        try {
          const response = await fetch(`http://localhost:3001/get_habit/${id}`);
          if (response.ok) {
            const habitData = await response.json();
            // Atualize o estado "formData" com os dados obtidos da API.
            setFormData({
                nome_tarefa: habitData.nome_tarefa,
                descricao: habitData.descricao,
                icone_nome: habitData.icone_nome,
                status: habitData.status,
                data_inicio: habitData.data_inicio,
                data_fim: habitData.data_fim,
                hora_inicio: habitData.hora_inicio,
                hora_fim: habitData.hora_fim,
                repetir: habitData.repetir,
                notificacao: habitData.notificacao,
            });
          } else {
            Swal.fire('Error!', 'Failed to fetch habit data.', 'error');
          }
        } catch (error:any) {
          Swal.fire('Error!', 'Failed to fetch habit data: ' + error.message, 'error');
        }
      };
      fetchData();
    }
  }, [id]);

  const handleIconSelect = (iconName: any) => {
    setFormData((prevData) => ({
      ...prevData,
      icone_nome: iconName,
    }));
  };

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    try {
        const response = await fetch(`http://localhost:3001/habit/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          router.push(`/daily_habits/daily_habits`);
          Swal.fire('Success!', 'Habit updated successfully!', 'success');
        } else {
          Swal.fire('Error!', 'Failed to update the habit.', 'error');
        }
    } catch (error:any) {
      Swal.fire('Erro!', 'Erro ao enviar o formulário: ' + error.message, 'error');
    }
  };

  return (
    <div className="main-container">
      <div className="content-container">
        <Title>Edit Habit</Title>
        <div>
          <form onSubmit={handleSubmit}>
            <div className="form-container">
              <Input
                label="Nome"
                name="nome_tarefa"
                value={formData.nome_tarefa}
                onChange={handleChange}
                placeholder="Insira o nome do hábito aqui"
              />

              <Input
                label="Descrição"
                name="descricao"
                value={formData.descricao}
                onChange={handleChange}
                placeholder="Insira uma descrição aqui"
              />

              <IconField label="Ícones de Hábito" onIconSelect={handleIconSelect} />

              <Date
                label="Data"
                name1="data_inicio"
                value1={formData.data_inicio}
                onChange1={handleChange}
                name2="data_fim"
                value2={formData.data_fim}
                onChange2={handleChange}
                placeholder="dd/mm/yyyy"
                placeholder2="Data de Término"
              />

              <Time
                label="Hora"
                name1="hora_inicio"
                value1={formData.hora_inicio}
                onChange1={handleChange}
                name2="hora_fim"
                value2={formData.hora_fim}
                onChange2={handleChange}
                placeholder="hh:mm"
                placeholder2="Hora de Término"
              />

              <Dropdown
                label="Repetir"
                name="repetir"
                value={formData.repetir}
                onChange={handleChange}
                options={["Durante uma Semana", "Durante um Dia", "Nunca"]}
              />

              <Dropdown
                label="Notificação"
                name="notificacao"
                value={formData.notificacao}
                onChange={handleChange}
                options={["Sim", "Não"]}
              />

              <div className="container_button">
                <button className="cancel_button" type="button">
                  Cancelar
                </button>
                <button className="submit_button" type="submit">
                  <FontAwesomeIcon icon={faCheck} size="sm" style={{ color: '#000000' }} />
                  Salvar
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
