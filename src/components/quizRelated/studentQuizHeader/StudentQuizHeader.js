import React from 'react'
import './StudentQuizHeader.scss';

const StudentQuizHeader = ({quizTitle, courseTitle, courseCode, duration}) => {
  return (
    <div className="student-quiz-header-container">
        <p>{quizTitle}</p>
        <div className="quiz-header-details">
            <p>{courseTitle} |&nbsp;</p>
            <p>{courseCode} |&nbsp;</p>
            <p>{duration} minutes</p>
        </div>
    </div>
  )
}

export default StudentQuizHeader