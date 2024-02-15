import React, { useEffect, useState } from 'react'
import { supabase } from '../supabase/config'


const FetchCourseQuizzes = (courseCode) => {
    const [quizzesData, setQuizzesData] = useState([])    

    useEffect(() => {
      if (courseCode) {
        // const getQuizzes = async() => {
          
        //   // Getting all quiz assignments of the current student
        //   const quizzAssignments = await supabase    
        //   .from("quiz_assignment")
        //   .select()
        //   .eq('student_email', email)
        //   if (quizzAssignments.data) {
            

        //     const quizzAssignmentsData = await (Promise.all((quizzAssignments.data).map(async(quizzAssignment) => {
        //       const quizDetails = await supabase
        //       .from("quiz")
        //       .select()
        //       .eq("id", quizzAssignment.quiz_id)
        //       .single()
              
        //       const quizData = quizDetails.data
        //       if (quizData.course_code === courseCode) return quizDetails.data      
        //     })))

        //     // Removing undefined and null
        //     const filteredArray = quizzAssignmentsData.filter(item => item !== undefined && item !== null);
        //     setQuizzesData(filteredArray)
        //   }
        // }
        const getQuizzes = async() => {
            //  Getting all quizzes of the current course
          const fetchedQuizzes = await supabase    
          .from("quiz")
          .select()
          .eq('course_code', courseCode)
          
          if (fetchedQuizzes.data) {
            setQuizzesData(fetchedQuizzes.data)
        }

        }
        getQuizzes();

      }
    }, [courseCode])

  return {quizzesData: quizzesData}
}

export default FetchCourseQuizzes