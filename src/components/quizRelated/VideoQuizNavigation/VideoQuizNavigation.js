import React, { useState } from 'react'
import { IoBatteryCharging, IoLockOpen, IoRemoveCircleSharp } from "react-icons/io5";
import { IoMdRemoveCircle } from 'react-icons/io';
import './VideoQuizNavigation.scss'

const VideoQuizNavigation = ({alterFormData, questionTracker, tagTracker, quizPoints}) => {
    // Examination tags state and functions
    const [confirmedQuizTags, setConfirmedQuizTags] = useState([]);

    const [quizTagName, setQuizTagName] = useState('');

    const handleDelete = (index) => {
      const updatedQuizTags = confirmedQuizTags.filter((_, i) => i !== index);

        alterFormData(updatedQuizTags)

          setConfirmedQuizTags(updatedQuizTags);
    };

    const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        handleConfirm();
      }
    };

    const handleConfirm = () => {
      if (quizTagName.trim() !== '') {
        const newQuizTags = [...confirmedQuizTags, quizTagName];

        setConfirmedQuizTags(newQuizTags);     
        
        alterFormData(newQuizTags)

        setQuizTagName(''); 
      }
    };

    // End

  return (
    <div className="quiz-navigation">        
        <div className='qc-inputs'>
            <h1>Quiz Tag/s:</h1>
            <div className="quiz-tag-wrapper">
                {confirmedQuizTags.map((tagName, index) => (
                    <div className="quiz-tag-box" key={index}>
                    <span>{tagName}</span>
                    <IoMdRemoveCircle onClick={() => handleDelete(index)} />
                    </div>
                ))}

                <input
                    type="text"
                    placeholder="Add Quiz Tags..."
                    value={quizTagName}
                    onChange={(e) => setQuizTagName(e.target.value)}
                    onKeyPress={handleKeyPress}
                />
            </div>            
        </div>

        <div className="quiz-points">
            <h3>Quiz Points:&nbsp;<span>{isNaN(quizPoints) ? "?" : quizPoints}</span></h3>
        </div>

    </div>
  )
}

export default VideoQuizNavigation