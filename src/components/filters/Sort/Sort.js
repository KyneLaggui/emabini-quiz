import React, { useState, useEffect } from 'react';
import "./Sort.scss";
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { FaFilter } from 'react-icons/fa';
import { LuFilter } from "react-icons/lu";


const Sort = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleChoiceClick = (choice) => {
    console.log(`Selected: ${choice}`);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize(); // Set initial value
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      
      <div className={`sort-container ${isOpen ? 'open' : ''}`} onClick={toggleDropdown}>
        {isMobile ? (
          isOpen ? (
            <FaFilter size={18} />
          ) : (
            
            <LuFilter size={18} />
          )
        ) : (
          <>
            <p>Filter</p>
            {isOpen ? <IoIosArrowUp size={18} /> : <IoIosArrowDown size={18} />}
          </>
        )}
        
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
      
    </>
  );
};

export default Sort;
