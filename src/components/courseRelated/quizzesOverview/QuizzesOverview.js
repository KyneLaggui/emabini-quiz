import React from 'react'
import CourseState from '../courseState/CourseState'
import "./QuizzesOverview.scss"

const QuizzesOverview = () => {
    const quizzes = [
        {
            quizTitle: 'CPU Scheduling Examination',
            quizDate: 'November 16, 2023',
            quizTime: '10:00am- 12:00pm',
            quizState: 'Done'
        },
        {
            quizTitle: 'Terminal Pop Quiz',
            quizDate: 'November 16, 2023',
            quizTime: '1:00pm- 2:00pm',
            quizState: 'Not Available'
        },
        
    
    ]
  return (
    quizzes.length === 0 ? (
        <p>No quizzes found.</p>
    ) : (
        <div className='courses-weeks'>
            <h2>Week 1</h2>
            <div className='courses-quizzes'>
                { quizzes.map((quiz, i) => {
                        return (
                            <CourseState {...quiz} key={i}/>
                        )
                    })}
            </div>
           
        
        </div>
        
       
    )
  )
}

export default QuizzesOverview