import React from 'react'
import './StudentQuizCard.scss';
import { FaVolumeUp } from 'react-icons/fa';

const StudentQuizCard = ({ quiz }) => {
    const {question, answer, choices, number } = quiz

    return (
    <>
        <div className="student-quiz-card-container">
            <div className="student-question-number">{number}</div>
            <div className="volume-container">
                <FaVolumeUp size={20}/>
            </div>        
            <div className="student-quiz-question">
                {question}
            </div>        
        </div>
        <div className="student-questions-container">
            {
                choices.map((choice, index) => (
                    <button key={index}>{choice}</button>
                ))
            }
        </div>
    </>    
  )
}

export default StudentQuizCard