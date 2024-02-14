import React, { useEffect, useState } from 'react'
import CourseState from '../courseState/CourseState'
import "./QuizzesOverview.scss"
import FetchStudentQuizzes from '../../../customHooks/fetchStudentQuizzes'
import { Zoom } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../../supabase/config'

const QuizzesOverview = ({email, courseCode}) => {
    // const quizzes = [
    //     {
    //         quizTitle: 'CPU Scheduling Examination',
    //         quizDate: 'November 16, 2023',
    //         quizTime: '10:00am - 12:00pm',
    //         quizState: 'Done', 
    //         quizTopic: 'Lesson 1'
    //     },
    //     {
    //         quizTitle: 'Terminal Pop Quiz',
    //         quizDate: 'November 16, 2023',
    //         quizTime: '1:00pm - 2:00pm',
    //         quizState: 'Done',
    //         quizTopic: 'Lesson 1'
    //     },
    //     {
    //         quizTitle: 'Midterm Examination',
    //         quizDate: 'November 23, 2023',
    //         quizTime: '1:00pm - 2:00pm',
    //         quizState: 'Take Now',
    //         quizTopic: 'Assessment Skills'
    //     },
    //     {
    //         quizTitle: 'Finals Examination',
    //         quizDate: 'December 3, 2023',
    //         quizTime: '1:00pm - 2:00pm',
    //         quizState: 'Not Available',
    //         quizTopic: 'Departamentals Exam'
    //     },            
    // ]

    const {quizzesData} = FetchStudentQuizzes(email, courseCode)
    
    const [quizzes, setQuizzes] = useState([])

    const navigate = useNavigate()

    // const groupedQuizzes = quizzes.reduce((acc, quiz) => {
    //     if (quiz) {
    //     const { quizTopic } = quiz;
    //     if (!acc[quizTopic]) {
    //         acc[quizTopic] = [];
    //     }
    //     acc[quizTopic].push(quiz);
    //     return acc;
    //     }

    // }, {});

    const handleClick = (quizId) => {
        navigate(`/student-quiz/${quizId}`)
    }        

    useEffect(() => {
        const getData = async() => {
            if (quizzesData) {
                let quizResults = await Promise.all((quizzesData).map(async(quizData) => {
                    const {data, error} = await supabase
                    .from('quiz_assignment')
                    .select()
                    .eq('student_email', email)
                    .eq('quiz_id', quizData['id'])
                    .single()        

                    if (data) {
                        return {...quizData, taken: data.taken}
                    }
                }))      
                quizResults = quizResults.filter(item => item !== undefined);
                setQuizzes(quizResults)
            }
        }

        getData()
    }, [quizzesData])

  return (
    quizzes.length === 0 ? (
        <p>No quizzes found.</p>
    ) : (
        
        // Object.keys(groupedQuizzes).map((quizTopic, index) => (
        //     <div key={index}>
        //         <h1 className='topic-titles'>{quizTopic}</h1>
        //         <div className='courses-quizzes'>
        //             {groupedQuizzes[quizTopic].map((quiz, i) => (
        //                 <CourseState {...quiz} key={i} />
        //             ))}
        //         </div>
        //     </div>
        // ))
        <div>
            <h1 className='topic-titles'>Posted Examinations</h1>
            <div className="courses-quizzes">
                {quizzes.map((quiz, index) => (              
                    <div className="quiz-course-container"onClick={() => handleClick(quiz.id)}>
                        <CourseState {...quiz} key={index} email={email}/>                    
                    </div>
                ))}
            </div>            
        </div>
        
    )
  )
}
export default QuizzesOverview