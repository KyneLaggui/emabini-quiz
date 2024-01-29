import React, { useState } from 'react';
import "./Sort.scss";
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

const Sort = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleChoiceClick = (choice) => {

    console.log(`Selected: ${choice}`);
   
    setIsOpen(false);
  };

  return (
    <div className={`sort-container ${isOpen ? 'open' : ''}`} onClick={toggleDropdown}>
      <p>Filter</p>
      {isOpen ? <IoIosArrowUp size={18} /> : <IoIosArrowDown size={18} />}
      
      {isOpen && (
        <div className="dropdown-content">
          <div
            onClick={() => handleChoiceClick("Ascending")}
            className="dropdown-item"
          >
            Ascending
          </div>
          <div
            onClick={() => handleChoiceClick("Descending")}
            className="dropdown-item"
          >
            Descending
          </div>
        </div>
      )}
    </div>
  );
};

export default Sort;
