import React, { useState, useEffect } from "react";
import Image from 'next/image';

interface Icon {
  url: string;
  nome: string;
}

interface Props {
  label: string;
  onIconSelect: (iconName: string) => void;
}

const IconField = ({ label, onIconSelect }: Props) => {
  const [icons, setIcons] = useState<Icon[]>([]);
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);

  useEffect(() => {
    async function fetchIcons() {
      try {
        const response = await fetch("http://localhost:3001/icons");
        if (!response.ok) {
          throw new Error("Falha ao buscar ícones");
        }
        const data = await response.json();
        setIcons(data as Icon[]);
      } catch (error) {
        console.error("Erro ao buscar ícones:", error);
      }
    }

    fetchIcons();
  }, []);

  const handleIconClick = (icon: Icon) => {
    setSelectedIcon(icon.nome);
    onIconSelect(icon.nome);
  };

  return (
    <div>
      <label className="label_input">{label}</label>
      <div className="habbit-container">
        <div className="icon-container">
          {icons.map((icon, index) => (
            <div
              key={index}
              className={`icon-option ${icon.nome === selectedIcon ? 'selected' : ''}`}
              onClick={() => handleIconClick(icon)}
            >
              <Image
                src={`data:image/png;base64,${icon.url}`}
                alt="Ícone"
                width={30}
                height={30}
              />
              <div>{icon.nome}</div>
            </div>
          ))}
        </div>
        <div className="see-all">See all icons</div>
      </div>
    </div>
  );
};

export default IconField;
