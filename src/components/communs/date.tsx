import React, { useRef, useState } from "react";

interface Props {
  label: string;
  placeholder: string;
  placeholder2: string;
}

export const Date = ({ label, placeholder, placeholder2 }: Props) => {
  const inputRef1 = useRef<HTMLInputElement | null>(null);
  const inputRef2 = useRef<HTMLInputElement | null>(null);

  const [dateValue1, setDateValue1] = useState("");
  const [dateValue2, setDateValue2] = useState("");

  const handleDateInput1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const formattedDate = formatInputDate(inputValue);
    setDateValue1(formattedDate);
  };

  const handleDateInput2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const formattedDate = formatInputDate(inputValue);
    setDateValue2(formattedDate);
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
          value={dateValue1}
          onChange={handleDateInput1}
        />
        <input
          ref={inputRef2}
          className="date_input_field"
          placeholder={placeholder2}
          value={dateValue2}
          onChange={handleDateInput2}
        />
      </div>
    </div>
  );
};
