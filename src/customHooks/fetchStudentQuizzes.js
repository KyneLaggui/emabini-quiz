import React, { useEffect, useState } from 'react'
import { supabase } from '../supabase/config'


const FetchStudentQuizzes = (email, courseCode) => {
    const [quizzesData, setQuizzesData] = useState([])    

    useEffect(() => {
      if (email && courseCode) {
        const getQuizzes = async() => {
          
          // Getting all quiz assignments of the current student
          const quizzAssignments = await supabase    
          .from("quiz_assignment")
          .select()
          .eq('student_email', email)

          if (quizzAssignments.data) {
            (Promise.all((quizzAssignments.data).map(async(quizzAssignment) => {
              const quizDetail = await supabase
              .from("quiz")
              .select()
              .eq("id", quizzAssignment.quiz_id)
              .single()

            // Filtering quizzes by course code
              if (quizDetail.data.course_code === courseCode) {
                console.log(quizDetail.data.course_code)
                setQuizzesData([...quizzesData, quizDetail.data])
              }

            })))
          }
        }

        getQuizzes();
        
      }
    }, [email, courseCode])

  return {quizzesData: quizzesData}
}

export default FetchStudentQuizzes