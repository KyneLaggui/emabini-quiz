import React, { useEffect, useState } from 'react'
import "./QuizOverview.scss"
import QuizCard from '../QuizCard/QuizCard'
import QuizCarousel from '../QuizCarousel/QuizCarousel'
import FetchQuizzesFaculty from '../../../customHooks/fetchQuizzesFaculty'
import { useSelector } from 'react-redux'
import { selectUserID } from '../../../redux/slice/authSlice'
import { Navigate, useNavigate } from 'react-router-dom'

const QuizOverview = () => {

    // const quizzes = [
    //     {
    //         quizName: 'CPU Scheduling Examination',
    //         quizUsers: '2 groups'
    //     }, 
    //     {
    //         quizName: 'WSL Examination',
    //         quizUsers: 'Not currently shared'
    //     }, 
    //     {
    //         quizName: 'Homogeneous Examination',
    //         quizUsers: '24 People'
    //     }, 
    //     {
    //         quizName: 'Homogeneous Examination',
    //         quizUsers: '24 People'
    //     }, 
    //     {
    //         quizName: 'Homogeneous Examination',
    //         quizUsers: '24 People'
    //     }, 
        
    
    // ]

    const [quizzes, setQuizzes] = useState([]);

    const id = useSelector(selectUserID);

    const {quizzesData} = FetchQuizzesFaculty(id)
    const navigate = useNavigate();

    const handleClick = (id) => {
        console.log('okay')
        navigate(`/create-multiple-choice-quiz/${id}`)
    } 

    useEffect(() => {
        setQuizzes(quizzesData)
    }, [quizzesData])

  return (
    <>
        <div className="course-overview-wrapper">
            <p className="eb-semi-titles">Quizzes Overview</p>
            {quizzes.length === 0 ? (
                <p>No quizzes found.</p>
            ) : (
                <QuizCarousel>
                    {quizzes.map((quiz, i) => {
                        return (
                            <QuizCard {...quiz} key={i} onClick={() => handleClick(quiz['id'])}/>
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