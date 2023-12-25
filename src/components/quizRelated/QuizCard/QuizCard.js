import React from 'react';
import "./QuizCard.scss";
import { Link } from 'react-router-dom';
import { MdGroup } from "react-icons/md";
import { IoIosMore } from "react-icons/io";

const QuizCard = ({ quizName, quizUsers }) => {
  return (
    <div className="quiz-card-container">
      <div className="quiz-card-cover"></div>
      <div className='quiz-card-wrapper'>
        <div className="quiz-card-detail">
          <p className="quiz-card-title">
            <Link>{quizName}</Link>
          </p>
          {quizUsers === "Not currently shared" ? (
            <div className="quiz-card-user-container">
              <MdGroup />
              <p><span className='gray-cont'>{quizUsers}</span></p>
            </div>
          ) : (
            <div className="quiz-card-user-container">
              <MdGroup />
              <p>
                Shared with <span className='gray-cont'>{quizUsers}</span>
              </p>
            </div>
          )}
        </div>
        <IoIosMore />
      </div>
      
    </div>
  );
};

export default QuizCard;
