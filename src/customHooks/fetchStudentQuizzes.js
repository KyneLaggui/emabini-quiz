import React, { useEffect, useState } from 'react'
import { supabase } from '../supabase/config'


const FetchStudentQuizzes = (email, courseCode) => {
    const [quizzesData, setQuizzesData] = useState([])    

    useEffect(() => {
      if (email && courseCode) {
        let allQuizzes = []
        const getQuizzes = async() => {
          
          // Getting all quiz assignments of the current student
          const quizzAssignments = await supabase    
          .from("quiz_assignment")
          .select()
          .eq('student_email', email)
          const quizzAssignmentsVideo = await supabase    
          .from("quiz_video_assignment")
          .select()
          .eq('student_email', email)

          
          if (quizzAssignments.data) {
            

          const quizzAssignmentsData = await (Promise.all((quizzAssignments.data).map(async(quizzAssignment) => {
            const quizDetails = await supabase
            .from("quiz")
            .select()
            .eq("id", quizzAssignment.quiz_id)
            .single()
            
            const quizData = quizDetails.data
            if (quizData.course_code === courseCode) return quizDetails.data      
          })))

          
          const quizzVideoAssignmentsData = await (Promise.all((quizzAssignmentsVideo.data).map(async(quizzAssignment) => {
            const quizDetails = await supabase
            .from("quiz_video")
            .select()
            .eq("id", quizzAssignment.quiz_id)
            .single()
            
            const quizData = quizDetails.data
            if (quizData.course_code === courseCode) return quizDetails.data      
          })))

          console.log(quizzVideoAssignmentsData)
          allQuizzes = quizzAssignmentsData.concat(quizzVideoAssignmentsData)

            // Removing undefined and null
            const filteredArray = allQuizzes.filter(item => item !== undefined && item !== null);
            setQuizzesData(filteredArray)
          }
        }

        getQuizzes();
        
      }
    }, [email, courseCode])

  return {quizzesData: quizzesData}
}

export default FetchStudentQuizzes