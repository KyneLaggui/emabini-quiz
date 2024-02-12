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

    // const evaluateAnswer = (chosenAnswer) => {
    //     console.log(chosenAnswer);
    //     // const verdict = checkAnswer(chosenAnswer);
    //     // if (verdict) {
    //     //     compileScore(id, 0)
    //     // } else {
    //     //     compileScore(id, points)
    //     // }

    //     // if (currentPage < totalQuizCards) {
    //     //     paginateNext()
    //     // }
    // }

    // const currentPage = useSelector(selectCurrentPage)
    // const dispatch = useDispatch();

    // Go to the next page
    // const paginateNext = () => {
    //     dispatch(
    //         SET_CURRENT_PAGE(currentPage + 1)
    //     )
    // }


    return (
        <>
            <div className="student-quiz-card-container">
                <div className="student-question-number">{number}</div>
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
                ))}
            </div>
        </>
    );
}

export default StudentQuizCard