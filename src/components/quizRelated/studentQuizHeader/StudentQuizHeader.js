import React, { useState, useEffect } from 'react';
import './StudentQuizHeader.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons'; // Import the clock icon from Font Awesome
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';

const StudentQuizHeader = ({ quizTitle, courseTitle, courseCode, duration, handleSubmit, showAnswer }) => {
  const [remainingTime, setRemainingTime] = useState(duration * 60);

  useEffect(() => {
    if (duration) {
      setRemainingTime(duration * 60);
    }
  }, [duration])

  useEffect(() => {
    let timer;
    if (duration) {
      timer = setInterval(() => {
        setRemainingTime(prevTime => {
          if (prevTime <= 0) {
            handleSubmit()
            clearInterval(timer);
            // You can add any additional logic here when the timer reaches zero            
            return 0;
          }  
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [duration, handleSubmit]);

  // Function to format time to HH:MM:SS
  const formatTime = time => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="student-quiz-header-container">
      <p>{quizTitle}</p>
      <div className="quiz-header-details">
        <p>{courseTitle} |&nbsp;</p>
        <p>{courseCode} |&nbsp;</p>
        <p>
        <p><FontAwesomeIcon icon={faClock} />&nbsp;{formatTime(remainingTime)}</p>
        </p>
      </div>
    </div>
  );
};

export default StudentQuizHeader;
