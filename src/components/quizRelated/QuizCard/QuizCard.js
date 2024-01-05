import React, { useEffect, useRef, useState } from 'react';
import "./QuizCard.scss";
import { Link } from 'react-router-dom';
import { MdGroup } from "react-icons/md";
import { IoIosMore } from "react-icons/io";

const QuizCard = ({ quizName, quizUsers, quizState, quizTags, activeTab }) => {

  const qcuTagsContainer = useRef(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(null);
  const [scrollLeft, setScrollLeft] = useState(null);

  useEffect(() => {
    const container = qcuTagsContainer.current;

    const handleMouseDown = (e) => {
        setIsMouseDown(true);
        setStartX(e.pageX - container.offsetLeft);
        setScrollLeft(container.scrollLeft);
    };

    const handleMouseUp = () => {
        setIsMouseDown(false);
    };

    const handleMouseLeave = () => {
        setIsMouseDown(false);
    };

    const handleMouseMove = (e) => {
        if (!isMouseDown) return;
        e.preventDefault();
        const x = e.pageX - container.offsetLeft;
        const walk = (x - startX) * 3; // Adjust the scrolling speed
        container.scrollLeft = scrollLeft - walk;
    };

    container.addEventListener('mousedown', handleMouseDown);
    container.addEventListener('mouseup', handleMouseUp);
    container.addEventListener('mouseleave', handleMouseLeave);
    container.addEventListener('mousemove', handleMouseMove);

    return () => {
        container.removeEventListener('mousedown', handleMouseDown);
        container.removeEventListener('mouseup', handleMouseUp);
        container.removeEventListener('mouseleave', handleMouseLeave);
        container.removeEventListener('mousemove', handleMouseMove);
    };
}, [isMouseDown, scrollLeft, startX]);

  const isExploreTab = activeTab === 'explore';

  return (
    <div className="quiz-card-container">
      
      <div className="quiz-card-cover">
          {quizState === "Draft" && (
            <p className="draft-button">Draft</p>
          )}
      </div>
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
              {isExploreTab ? (
                  <div className='qcu-tags' ref={qcuTagsContainer}>
                      {quizTags.map((tag, index) => (
                                          
                        <p className='yellow-cont' key={index}>{tag}</p>
                  
                    
                  ))}
                  </div>
                ) : (
                    <>
                        <MdGroup />
                        <p>
                            Shared with <span className='gray-cont'>{quizUsers}</span>
                        </p>
                    </>
                )}
            </div>
          )}
        </div>
        <IoIosMore />
      </div>
      
    </div>
  );
};

export default QuizCard;
