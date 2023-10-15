import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { Title } from "@/components/communs/title";
import IconField from "@/components/communs/icons";
import { Time } from "@/components/communs/time";
import { Dropdown } from "@/components/communs/dropdown";
import { Date } from "@/components/communs/date";
import Input from "@/components/communs/input";


export default function New_habbit() {
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
      const response = await fetch("http://localhost:3001/cadastrar_habito", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // O envio foi bem-sucedido, você pode lidar com a resposta ou redirecionar para outra página, se necessário.
        console.log("Habit cadastrado com sucesso!");
      } else {
        console.error("Falha ao cadastrar o hábito.");
      }
    } catch (error) {
      console.error("Erro ao enviar o formulário:", error);
    }
  };

  return (
    <>
      <div className="main-container">
        <div className="content-container">
          <Title>New Habbit</Title>
          <div>
            <form onSubmit={handleSubmit}>
              <div className="form-container">
                <Input
                  label="Name"
                  name="nome_tarefa"
                  value={formData.nome_tarefa}
                  onChange={handleChange}
                  placeholder="Put a habit name here"
                />

                <Input
                  label="Description"
                  name="descricao"
                  value={formData.descricao}
                  onChange={handleChange}
                  placeholder="Put a description here"
                />

                <IconField label="Habit Icons" onIconSelect={handleIconSelect}/>

                <Date
                  label="Date"
                  name1="data_inicio"
                  value1={formData.data_inicio}
                  onChange1={handleChange}
                  name2="data_fim"
                  value2={formData.data_fim}
                  onChange2={handleChange}
                  placeholder="dd/mm/yyyy"
                  placeholder2="End Time"
                />

                <Time
                  label="Hour"
                  name1="hora_inicio"
                  value1={formData.hora_inicio}
                  onChange1={handleChange}
                  name2="hora_fim"
                  value2={formData.hora_fim} 
                  onChange2={handleChange}
                  placeholder="hh:mm"
                  placeholder2="End Time"
                />

                <Dropdown
                  label="Repeat"
                  name="repetir" // Adicione o nome da chave correspondente no seu estado
                  value={formData.repetir} // Passe o valor do seu estado
                  onChange={handleChange} // Passe a função de atualização do seu estado
                  options={["During a Week", "During a Day", "Never"]}
                />


                <Dropdown
                  label="Notification"
                  name="notification" // Adicione o nome da chave correspondente no seu estado
                  value={formData.notificacao} // Passe o valor do seu estado
                  onChange={handleChange} // Passe a função de atualização do seu estado
                  options={["Yes", "No"]}
                />


                <div className="container_button">
                  <button className="cancel_button" type="button">
                    Cancel
                  </button>
                  <button className="submit_button" type="submit">
                    <FontAwesomeIcon icon={faCheck} size="sm" style={{ color: '#000000' }} />
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
