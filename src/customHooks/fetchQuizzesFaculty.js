import React, { useEffect, useState } from 'react'
import { supabase } from '../supabase/config';

const FetchQuizzesFaculty = (id, dataChange) => {
    const [quizzesData, setQuizzesData] = useState([])

    useEffect(() => {
        const fetchQuizStudents = async() => {
            if (id) {
                // Fetching the faculty member's registered courses as an instructor
                const quizzesCreated = await supabase 
                .from('quiz')                
                .select()
                .eq('instructor_id', id)
                
                if (quizzesCreated.data) {
                   const quizzes = []
                      
                    // Fetching the enrolled students in the registered courses
                    const courseFullDetails = await Promise.all((quizzesCreated.data).map(async(quiz) => {   
                        const quizStudents = await supabase
                            .from('quiz_assignment')
                            .select()
                            .eq('quiz_id', quiz['id'])
                            

                        const studentsArray = quizStudents.data || []
                                            
                        quizzes.push({
                            ...quiz,
                            students: studentsArray
                        })
                    }))     

                    setQuizzesData(quizzes)
                }                                       
            
            }                                      
        }   
        
        fetchQuizStudents();
    }, [id, dataChange])

    return {quizzesData}
}

export default FetchQuizzesFaculty