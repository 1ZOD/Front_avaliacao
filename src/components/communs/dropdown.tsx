import React, { useState, useRef, useEffect } from "react";

interface Props {
  label: any;
  options: string[];
}

export const Dropdown = ({ label, options }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectOption = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
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
    <>
      <label className="label_input">{label}</label>
      <div className="dropdown" ref={dropdownRef}>
        <button type="button" className="dropdown-toggle" onClick={toggleDropdown}>
          {selectedOption} <div> {isOpen ? "▲" : "▼"}</div>
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
    </>
  );
};
