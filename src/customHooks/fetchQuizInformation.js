import React, { useEffect, useState } from 'react'
import { supabase } from '../supabase/config';

const FetchQuizInformation = (id, dataChange) => {
    const [fetchedQuizInfo, setFetchedQuizInfo] = useState({})

    useEffect(() => {
        const fetchQuizStudents = async() => {
            if (id) {
                // Fetching the faculty member's registered courses as an instructor
                const quiz = await supabase 
                .from('quiz')                
                .select()
                .eq('id', id)
                .single()                
                
                if (quiz.data) {
                    // Fetching the assigned students in the quiz

                    const students = await supabase
                    .from('quiz_assignment')
                    .select()
                    .eq('quiz_id', id)

                    const questions = await supabase
                    .from('question')
                    .select()
                    .eq('quiz_id', id)

                    setFetchedQuizInfo({
                        ...quiz.data,
                        students: students.data,
                        questions: questions.data
                    })
                    // const questions = await Promise.all((quiz.data).map(async(quiz) => {   
                    //     const quizStudents = await supabase
                    //         .from('quiz_assignment')
                    //         .select()
                    //         .eq('quiz_id', quiz['id'])
                            

                    //     const studentsArray = quizStudents.data || []
                                            
                    //     quizzes.push({
                    //         ...quiz,
                    //         students: studentsArray
                    //     })
                    // }))     
                }                                       
            
            }                                      
        }   
        
        fetchQuizStudents();
    }, [id, dataChange])

    return {fetchedQuizInfo}
}

export default FetchQuizInformation