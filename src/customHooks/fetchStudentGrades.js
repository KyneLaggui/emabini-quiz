import React, { useEffect, useState } from 'react'
import { supabase } from '../supabase/config';

const FetchStudentGrades = (email, dataChange) => {
    const [gradesData, setGradesData] = useState([])

    useEffect(() => {
        const fetchQuizStudents = async() => {
            if (email) {
                // Fetching the faculty member's registered courses as an instructor
                const quizzesTaken = await supabase 
                .from('quiz_grades')                
                .select()
                .eq('student_email', email)
                if (quizzesTaken.data) {
                    
                   const quizzes = {}
                      
                    // Fetching the enrolled students in the registered courses
                    const courseFullDetails = await Promise.all((quizzesTaken.data).map(async(quiz) => {   
                        const quizData = await supabase
                            .from('quiz')
                            .select()
                            .eq('id', quiz['quiz_id'])
                            .single()

                        if (quizData.data) {
                            const quizDataByCode = await supabase
                            .from('course')
                            .select()
                            .eq('code', quizData.data['course_code'])
                            .single()
                            if (quizzes.hasOwnProperty(quizDataByCode.data.category)) {
                                quizzes[quizDataByCode.data.category] = quizzes[quizDataByCode.data.category] + quiz.score;
                            } else {
                                quizzes[quizDataByCode.data.category] = quiz.score;
                            }
                        }

                    }))     

                    setGradesData(quizzes)
                }                                       
            }                                      
        }   
        
        fetchQuizStudents();
    }, [email, dataChange])

    return gradesData
}

export default FetchStudentGrades