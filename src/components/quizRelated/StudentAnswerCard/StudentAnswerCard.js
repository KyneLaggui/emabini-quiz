import React from 'react'
import './StudentAnswerCard'
import { FaVolumeUp } from 'react-icons/fa';

const StudentAnswerCard = ( {quizItem} ) => {
    console.log(quizItem)
    console.log(quizItem.isCorrect)


  return (
    <>
            <div className="student-quiz-card-container">
                <div className={`student-question-number ${quizItem.isCorrect === 'true' ? 'correct' : 'wrong'}`}>
                    {quizItem.answer}
                    
                </div>
                {/* <div className="student-question-point">{`${points} ${points > 1 ? `points` : `point`}`}</div>
                <div className="volume-container">
                    <FaVolumeUp size={20} />
                </div>
                <div className="student-quiz-question">{question}</div>
            </div>
            <div className="student-questions-container">
                {choice.map((choice, index) => (
                    <button
                        key={index}
                        className={isChoiceSelected(choice) ? 'selected' : ''}
                        onClick={() => handleChoiceClick(choice)}
                    >
                        {choice}
                    </button>
                ))} */}
            </div>
        </>
  )
}

export default StudentAnswerCard