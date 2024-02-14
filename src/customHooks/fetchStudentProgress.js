import React, { useEffect, useState } from 'react'
import { supabase } from '../supabase/config';

const FetchStudentProgress = (email, code) => {
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
                   const quizzes = []
                      
                    // Fetching the enrolled students in the registered courses
                    const courseFullDetails = await Promise.all((quizzesTaken.data).map(async(quiz) => {   
                        let quizGrade = {}
                        const quizData = await supabase
                            .from('quiz')
                            .select()
                            .eq('id', quiz['quiz_id'])
                            .eq('course_code', code)
                            .single()

                        if (quizData.data) {
                            // const quizDataByCode = await supabase
                            // .from('course')
                            // .select()
                            // .eq('code', quizData.data['course_code'])
                            // .single()
                            // if (quizzes.hasOwnProperty(quizDataByCode.data.category)) {
                            //     quizzes[quizDataByCode.data.category] = quizzes[quizDataByCode.data.category] + quiz.score;
                            // } else {
                            //     quizzes[quizDataByCode.data.category] = quiz.score;
                            // }
                            quizGrade['title'] = quizData.data.title
                            quizGrade['score'] = quiz.score
                            quizzes.push(quizGrade)
                            // setGradesData([...gradesData, quizzes])
                        }

                    }))     

                    setGradesData(quizzes)

                }                                       
            }                                      
        }   
        
        fetchQuizStudents();
    }, [email, code])

    return gradesData
}

export default FetchStudentProgress