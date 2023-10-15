import React, { useRef } from "react";

interface Props {
  label: string;
  placeholder: string;
  placeholder2: string;
}

export const Time = ({ label, placeholder, placeholder2 }: Props) => {
  const inputRef1 = useRef<HTMLInputElement | null>(null);
  const inputRef2 = useRef<HTMLInputElement | null>(null);

  const formatTime = (inputValue: string) => {
    const cleanedValue = inputValue.replace(/\D/g, "");
    
    if (cleanedValue.length > 2) {
      return `${cleanedValue.slice(0, 2)}:${cleanedValue.slice(2, 4)}`;
    } else {
      return cleanedValue;
    }
  };
  
  const handleTimeInput1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const formattedTime = formatTime(inputValue);
    if (inputRef1.current) {
      inputRef1.current.value = formattedTime;
    }
  };
  
  const handleTimeInput2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const formattedTime = formatTime(inputValue);
    if (inputRef2.current) {
      inputRef2.current.value = formattedTime;
    }
  };

  return (
    <div className="time-container">
      <label className="label_input">{label}</label>
      <div className="container_time">
        <input
          ref={inputRef1}
          className="time_input_field"
          placeholder={placeholder}
          onChange={handleTimeInput1}
        />
        <input
          ref={inputRef2}
          className="time_input_field"
          placeholder={placeholder2}
          onChange={handleTimeInput2}
        />
      </div>
    </div>
  );
};
