import React, { useState } from "react";
import { FaHome, FaUser, FaCog, FaHeart, FaStar, FaEnvelope } from "react-icons/fa";

const IconField = () => {
  const [selectedIcon, setSelectedIcon] = useState(null);

  const iconOptions = [
    { icon: <FaHome />, name: "Home" },
    { icon: <FaUser />, name: "User" },
    { icon: <FaCog />, name: "Settings" },
    { icon: <FaHeart />, name: "Heart" },
    { icon: <FaStar />, name: "Star" },
    { icon: <FaEnvelope />, name: "Envelope" },
  ];

  const handleIconClick = (icon: any) => {
    setSelectedIcon(icon);
  };

  return (
    <div>
      <div className="icon-container">
        {iconOptions.map((option, index) => (
          <div key={index} className="icon-option" onClick={() => handleIconClick(option.name)}>
            {option.icon}
          </div>
        ))}
      </div>
      <div className="selected-icon">
        {selectedIcon && (
          <p>Selected Icon: {selectedIcon}</p>
        )}
      </div>
    </div>
  );
};

export default IconField;
