import React from 'react'
import './StudentQuizTracker.scss';

const StudentQuizTracker = ({ number }) => {

    const numbers = Array.from({ length: number }, (_, index) => index + 1);
    
  return (
    <div className="student-quiz-tracker-container">
        {
            numbers.map((number, index) => (
                <div key={index}>
                    <div>
                        {number}
                    </div>
                </div>
            ))
        }
        
    </div>
  )
}

export default StudentQuizTracker