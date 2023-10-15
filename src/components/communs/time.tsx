import React, { useRef } from "react";

interface Props {
  label: string;
  placeholder: string;
  placeholder2: string;
  name1: string;
  value1: string;
  onChange1: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name2: string;
  value2: string;
  onChange2: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Time = ({
  label,
  placeholder,
  placeholder2,
  name1,
  value1,
  onChange1,
  name2,
  value2,
  onChange2,
}: Props) => {
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
    onChange1(event);
  };

  const handleTimeInput2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const formattedTime = formatTime(inputValue);
    if (inputRef2.current) {
      inputRef2.current.value = formattedTime;
    }
    onChange2(event);
  };

  return (
    <div className="time-container">
      <label className="label_input">{label}</label>
      <div className="container_time">
        <input
          ref={inputRef1}
          className="time_input_field"
          placeholder={placeholder}
          name={name1}
          value={value1}
          onChange={handleTimeInput1}
        />
        <input
          ref={inputRef2}
          className="time_input_field"
          placeholder={placeholder2}
          name={name2}
          value={value2}
          onChange={handleTimeInput2}
        />
      </div>
    </div>
  );
};
