import React, { useEffect, useState } from 'react'
import "./QuizzesFacultyOverview.scss"
import { Zoom } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../../supabase/config'
import FetchCourseQuizzes from '../../../customHooks/fetchCourseQuizzes'
import Papa from 'papaparse';
import { CSVLink } from 'react-csv';

const QuizzesOverview = ({courseCode}) => {

    const {quizzesData} = FetchCourseQuizzes(courseCode)
    
    const [quizzes, setQuizzes] = useState([])

    const navigate = useNavigate()

    const handleClick = (quizId) => {
        navigate(`/student-quiz/${quizId}`)
    }        

    const exportToCsv = (data, filename) => {
      const csvData = Papa.unparse(data, { headers: true });
      const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8' });
      const url = window.URL.createObjectURL(blob);
    
      // Trigger download
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      link.click();
    
      // Clean up
      window.URL.revokeObjectURL(url);
    };

    // useEffect(() => {
    //   console.log(courseCode)
    // }, [courseCode])
    const handleExport = () => {
      if (quizzes) {
        exportToCsv(quizzes, 'my_data.csv');
      }
    };

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

              let quizVideoResults = await Promise.all((quizzesData).map(async(quizData) => {
                    const {data, error} = await supabase
                    .from('quiz_video_grades')
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

                    console.log(error)
                }))   

                quizResults = quizResults.concat(quizVideoResults)

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
        <>
        <h1 className='eb-semi-titles'>Student Examination Results</h1>
        <p>No quizzes found.</p>
        </>
       
    ) : (
        // <div className='efc-main-container'>
        //     <h1 className='eb-semi-titles'>Student Examination Results</h1>
        //     <button className="csv-button" onClick={handleExport}>Export into CSV</button>
        //     <div className="courses-quizzes">
        //         {
        //           quizzes.map((quiz, index) => {
        //             return (
        //               <div className="student-results-container">
        //                 <p className='eb-semi-titles'>Quiz: {`${quiz.title}`}</p>
        //                 <p className='eb-standard'>Student Email: {`${quiz.student}`}</p>
        //                 <p className='eb-standard'>Points: <span className='qfc-score'>{`${quiz.score}`} / {`${quiz.overallScore}`}</span></p>
        //               </div>
        //             )
        //           })
        //         }
        //     </div>            
        // </div>
        <div className="efc-main-container">
        <h1 className="eb-semi-titles">Student Examination Results</h1>
        <button className="csv-button" onClick={handleExport}>
          Export into CSV
        </button>
        <div className="courses-quizzes">
          <table className="quiz-table">
            <thead>
              <tr>
                <th>Quiz Title</th>
                <th>Student Email</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {quizzes.map((quiz, index) => (
                <tr key={index}>
                  <td>{quiz.title}</td>
                  <td>{quiz.student}</td>
                  <td>
                    <span className="qfc-score">
                      {quiz.score} / {quiz.overallScore}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
        
    )
  )
}
export default QuizzesOverview