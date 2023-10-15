import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

interface Props {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  options: string[];
}

export const Dropdown = ({ label, name, value, onChange, options }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectOption = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);

    // Crie um evento do tipo ChangeEvent manualmente
    const event = {
      target: {
        name: name,
        value: option,
      },
    } as React.ChangeEvent<HTMLInputElement>;

    // Chame a função de atualização do estado com o evento criado
    onChange(event);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <label className="label_input">{label}</label>
      <div className="dropdown" ref={dropdownRef}>
        <button type="button" className="dropdown-toggle" onClick={toggleDropdown}>
          {selectedOption}
          <div>
            {isOpen ? <FontAwesomeIcon icon={faChevronUp} size="sm" style={{ color: '#cac4d0' }} /> :
            <FontAwesomeIcon icon={faChevronDown} size="sm" style={{ color: '#cac4d0' }} />}
          </div>
        </button>
        {isOpen && (
          <ul className="dropdown-menu">
            {options.map((option, index) => (
              <li key={index} onClick={() => selectOption(option)}>
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
