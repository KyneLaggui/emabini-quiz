import React, { useState } from 'react'
import './StudentQuizCard.scss';
import { FaVolumeUp } from 'react-icons/fa';
import { SET_CURRENT_PAGE, selectCurrentPage } from '../../../redux/slice/quizPaginationSlice';
import { useDispatch, useSelector } from 'react-redux';

const StudentQuizCard = ({ quiz, number, addAnswer, answerCompilation }) => {
    const {question, answer, choice, id, points} = quiz  

    // Check if a choice is in the answerCompilation for the current question
    const isChoiceSelected = (choice) => {
    return answerCompilation[id] && answerCompilation[id].includes(choice);
    };

    const handleChoiceClick = (chosenAnswer) => {
        addAnswer(chosenAnswer, id, answer.length);
    };

    const handleSpeakQuestion = () => {
        const speech = new SpeechSynthesisUtterance(question);
        window.speechSynthesis.speak(speech);
    };

    return (
        <div>
            <div className="student-quiz-card-container">
                <div className="student-question-number">{number}</div>
                <div className="student-question-point">{`${points} ${points > 1 ? `points` : `point`}`}</div>
                <div className="volume-container">
                    <FaVolumeUp size={20} onClick={handleSpeakQuestion} />
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
                ))}
            </div>
        </div>
    );
}

export default StudentQuizCard