import React, { useState } from 'react';
import "./CourseQuizSettings.scss"
import { IoIosMore } from 'react-icons/io';

const CourseQuizSettings = () => {

    const [showSettings, setShowSettings] = useState(false);

    const toggleSettings = () => {
      setShowSettings(!showSettings);
    };
    
    return (
        <div className="settings-container">
          <div className="settings-button" onClick={toggleSettings}>
            <IoIosMore />
          </div>
          {showSettings && (
            <div className="settings-dropdown">
              <p>Add</p>
              <p>Edit</p>
              <p>Delete</p>
            </div>
          )}
        </div>
      );
    };


export default CourseQuizSettings