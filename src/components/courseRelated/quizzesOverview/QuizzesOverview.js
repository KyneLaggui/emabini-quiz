import React from 'react'
import CourseState from '../courseState/CourseState'
import "./QuizzesOverview.scss"

const QuizzesOverview = () => {
    const quizzes = [
        {
            quizTitle: 'CPU Scheduling Examination',
            quizDate: 'November 16, 2023',
            quizTime: '10:00am - 12:00pm',
            quizState: 'Done', 
            quizWeek: '1'
        },
        {
            quizTitle: 'Terminal Pop Quiz',
            quizDate: 'November 16, 2023',
            quizTime: '1:00pm - 2:00pm',
            quizState: 'Done',
            quizWeek: '1'
        },
        {
            quizTitle: 'Midterm Examination',
            quizDate: 'November 23, 2023',
            quizTime: '1:00pm - 2:00pm',
            quizState: 'Take Now',
            quizWeek: '2'
        },
        {
            quizTitle: 'Finals Examination',
            quizDate: 'December 3, 2023',
            quizTime: '1:00pm - 2:00pm',
            quizState: 'Not Available',
            quizWeek: '3'
        },
        
    
    ]

    const groupedQuizzes = quizzes.reduce((acc, quiz) => {
        const { quizWeek } = quiz;
        if (!acc[quizWeek]) {
            acc[quizWeek] = [];
        }
        acc[quizWeek].push(quiz);
        return acc;
    }, {});
    

  return (
    quizzes.length === 0 ? (
        <p>No quizzes found.</p>
    ) : (
        
        Object.keys(groupedQuizzes).map((week, index) => (
            <div key={index}>
                <h1 className='week-titles'>Week {week}</h1>
                <div className='courses-quizzes'>
                    {groupedQuizzes[week].map((quiz, i) => (
                        <CourseState {...quiz} key={i} />
                    ))}
                </div>
            </div>
        ))
    )
  )
}

export default QuizzesOverview