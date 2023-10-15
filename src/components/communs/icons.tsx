import React, { useState, useEffect } from "react";
import Image from 'next/image';

interface Icon {
  url: string;
  nome: string;
}

interface Props{
  label : string
}

const IconField = ({label}: Props) => {
  const [icons, setIcons] = useState<Icon[]>([]);

  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);

  useEffect(() => {
    async function fetchIcons() {
      try {
        const response = await fetch("http://localhost:3001/icons");
        if (!response.ok) {
          throw new Error("Failed to fetch icons");
        }
        const data = await response.json();
        setIcons(data as Icon[]);
      } catch (error) {
        console.error("Error fetching icons:", error);
      }
    }

    fetchIcons();
  }, []);

  const handleIconClick = (icon: string) => {
    setSelectedIcon(icon);
  };

  return (
    <div>
      <label className="label_input">{label}</label>
      <div className="habbit-container">
        <div className="icon-container">
          {icons.map((icon, index) => (
            <div key={index} className="icon-option" onClick={() => handleIconClick(icon.url)}>
              <Image
                src={`data:image/png;base64,${icon.url}`}
                alt="Icon"
                width={30}
                height={30}
              />
              <div>{icon.nome}</div>
            </div>
          ))}
        </div>
        <div className="see-all">See all icons</div>
      </div>
      {/* <div className="selected-icon">
        {selectedIcon && (
          <div>
            <p>Selected Icon:</p>
            <Image
              src={`data:image/png;base64,${selectedIcon}`}
              alt="Selected Icon"
              width={100}
              height={100}
            />
          </div>
        )}
      </div> */}
    </div>
  );
};

export default IconField;
