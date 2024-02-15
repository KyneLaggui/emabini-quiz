import React, { useEffect, useState } from 'react'
import CourseState from '../courseState/CourseState'
import "./QuizzesFacultyOverview.scss"
import FetchStudentQuizzes from '../../../customHooks/fetchStudentQuizzes'
import { Zoom } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../../supabase/config'
import FetchCourseQuizzes from '../../../customHooks/fetchCourseQuizzes'

const QuizzesOverview = ({courseCode}) => {

    const {quizzesData} = FetchCourseQuizzes(courseCode)
    
    const [quizzes, setQuizzes] = useState([])

    const navigate = useNavigate()

    const handleClick = (quizId) => {
        navigate(`/student-quiz/${quizId}`)
    }        

    // useEffect(() => {
    //   console.log(courseCode)
    // }, [courseCode])

    useEffect(() => {
        const getData = async() => {
            if (quizzesData) {
              console.log(quizzesData)
              let quizResults = await Promise.all((quizzesData).map(async(quizData) => {
                    const {data, error} = await supabase
                    .from('quiz_grades')
                    .select()
                    .eq('quiz_id', quizData['id'])
                    .single()        

                    if (data) {
                      console.log(data)
                        return {
                          'score': data.score,
                          'title': quizData['title'],
                          'student': data.student_email,
                          'overallScore': quizData['overall_score'],
                        }
                    }
                }))   

                quizResults = quizResults.filter(item => item !== undefined);
                setQuizzes(quizResults)
            }
        }

        getData()
    }, [quizzesData])

    useEffect(() => {
      console.log('okay')
    }, [])
  return (
    quizzes.length === 0 ? (
        <p>No quizzes found.</p>
    ) : (
        <div className='efc-main-container'>
            <h1 className='eb-semi-titles'>Student Examination Results</h1>
            <div className="courses-quizzes">
                {/* {quizzes.map((quiz, index) => (              
                    <div className="quiz-course-container"onClick={() => handleClick(quiz.id)}>
                        <CourseState {...quiz} key={index} email={email}/>                    
                    </div>
                ))} */}
                {
                  quizzes.map((quiz, index) => {
                    return (
                      <div className="student-results-container">
                        <p className='eb-semi-titles'>Quiz: {`${quiz.title}`}</p>
                        <p className='eb-standard'>Student Email: {`${quiz.student}`}</p>
                        <p className='eb-standard'>Points: <span className='qfc-score'>{`${quiz.score}`} / {`${quiz.overallScore}`}</span></p>
                      </div>
                    )
                  })
                }
            </div>            
        </div>
        
    )
  )
}
export default QuizzesOverview