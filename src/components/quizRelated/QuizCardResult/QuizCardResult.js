import React from 'react'
import './QuizCardResult.scss';
import { FaAngleRight } from "react-icons/fa";

const QuizCardResult = ({ quiz, number }) => {
    const { coverages } = quiz
    let currentScore = 0;
    let overallScore = 0;
    for (let i = 0; i < coverages.length; i++) {
        currentScore += coverages[i]['score'];
        overallScore += coverages[i]['total'];
    }
  
    return (
        <div className="quiz-result-container">
            <div className="quiz-result-upper">
                <p>Quiz {number + 1}</p>
                <div className="quiz-result-score">{currentScore}/{overallScore}</div>
            </div>  
            <div className="quiz-coverage-container">
                {
                    coverages.map((coverage, index) => (
                        <div className="quiz-topic" key={index}>   
                            <div>
                                <FaAngleRight />
                                <p>{coverage['name']}</p>   
                            </div>      
                            <div className="quiz-coverage-score">{`${coverage['score']}/${coverage['total']}`}</div>                                                                    
                        </div>
                    ))
                }
                
            </div>
        </div>
    )
}

export default QuizCardResult;