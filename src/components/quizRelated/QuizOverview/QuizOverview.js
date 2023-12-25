import React from 'react'
import "./QuizOverview.scss"
import QuizCard from '../QuizCard/QuizCard'
import QuizCarousel from '../QuizCarousel/QuizCarousel'

const QuizOverview = () => {

    const quizzes = [
        {
            quizName: 'CPU Scheduling Examination',
            quizUsers: '2 groups'
        }, 
        {
            quizName: 'WSL Examination',
            quizUsers: 'Not currently shared'
        }, 
        {
            quizName: 'Homogeneous Examination',
            quizUsers: '24 People'
        }, 
        {
            quizName: 'Homogeneous Examination',
            quizUsers: '24 People'
        }, 
        {
            quizName: 'Homogeneous Examination',
            quizUsers: '24 People'
        }, 
        
    
    ]

  return (
    <>
        <div className="course-overview-wrapper">
            <p className="bold medium-text">Quizzes Overview</p>
            {quizzes.length === 0 ? (
                <p>No courses found.</p>
            ) : (
                <QuizCarousel>
                    {quizzes.map((course, i) => {
                        return (
                            <QuizCard {...course} key={i}/>
                        )
                    })}
                </QuizCarousel>
            )
        
        }
            
        </div>

    </>
  )
}

export default QuizOverview