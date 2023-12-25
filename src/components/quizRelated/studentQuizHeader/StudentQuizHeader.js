import React from 'react'
import './StudentQuizHeader.scss';

const StudentQuizHeader = () => {
  return (
    <div className="student-quiz-header-container">
        <p>CPU Scheduling</p>
        <div className="quiz-header-details">
            <p>Operating Systems |&nbsp;</p>
            <p>CMPE 30331 |&nbsp;</p>
            <p>BSCOE 3-1</p>
        </div>
    </div>
  )
}

export default StudentQuizHeader