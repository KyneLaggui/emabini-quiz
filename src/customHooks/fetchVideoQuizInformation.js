import React, { useEffect, useState } from 'react'
import { supabase } from '../supabase/config';

const FetchVideoQuizInformation = (id, dataChange) => {
    const [fetchedQuizInfo, setFetchedQuizInfo] = useState({})

    useEffect(() => {
        const fetchQuizStudents = async() => {
            if (id) {
                // Fetching the faculty member's registered courses as an instructor
                const quiz = await supabase 
                .from('quiz_video')                
                .select()
                .eq('id', id)
                .single()                
                
                if (quiz.data) {
                    // Fetching the assigned students in the quiz

                    const students = await supabase
                    .from('quiz_video_assignment')
                    .select()
                    .eq('quiz_id', id)

                    const questions = await supabase
                    .from('question_video')
                    .select()
                    .eq('quiz_id', id)

                    setFetchedQuizInfo({
                        ...quiz.data,
                        students: students.data,
                        questions: questions.data
                    })
                }                                       
            
            }                                      
        }   
        
        fetchQuizStudents();
    }, [id, dataChange])

    return {fetchedQuizInfo}
}

export default FetchVideoQuizInformation