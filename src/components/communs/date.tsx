import React, { useRef, useState } from "react";

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

export const Date = ({
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

  const [dateValue1, setDateValue1] = useState("");
  const [dateValue2, setDateValue2] = useState("");

  const handleDateInput1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const formattedDate = formatInputDate(inputValue);
    setDateValue1(formattedDate);
    onChange1(event);
  };

  const handleDateInput2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const formattedDate = formatInputDate(inputValue);
    setDateValue2(formattedDate);
    onChange2(event);
  };

  const formatInputDate = (inputValue: string) => {
    const sanitizedValue = inputValue.replace(/\D/g, "");
    const formattedDate = sanitizedValue
      .slice(0, 2) +
      (sanitizedValue.length > 2 ? "/" : "") +
      sanitizedValue.slice(2, 4) +
      (sanitizedValue.length > 4 ? "/" : "") +
      sanitizedValue.slice(4, 8);

    return formattedDate;
  };

  return (
    <div className="date-container">
      <label className="label_input">{label}</label>
      <div className="container_date">
        <input
          ref={inputRef1}
          className="date_input_field"
          placeholder={placeholder}
          name={name1}
          value={dateValue1}
          onChange={handleDateInput1}
        />
        <input
          ref={inputRef2}
          className="date_input_field"
          placeholder={placeholder2}
          name={name2}
          value={dateValue2}
          onChange={handleDateInput2}
        />
      </div>
    </div>
  );
};
