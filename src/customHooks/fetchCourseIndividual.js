import React, { useEffect, useState } from 'react'
import { supabase } from '../supabase/config';

const FetchCourseIndividual = (id) => {
    const [courseData, setCourseData] = useState([])
    const [students, setStudents] = useState([])

    useEffect(() => {
        const fetchCourses = async() => {
            if (id) {
                // Fetching the faculty member's registered courses as an instructor
                const courseInfo = await supabase 
                .from('course')                
                .select()
                .eq('id', id)
                .single()

                if (courseInfo.data) {
                    setCourseData(courseInfo.data)

                    const students = await supabase
                    .from('course_enrollee')
                    .select()
                    .eq('course_code', courseInfo.data.code)

                    if (students.data) {
                        let studentsData = await Promise.all((students.data).map(async(student) => {
                            const studentData = await supabase
                            .from('profiles')
                            .select()
                            .eq('email', student.email)
                            .single()

                            return studentData.data
                        }))

                        setStudents(studentsData)
                    }                    
                }
            }                                       
        }   

        fetchCourses();
    }, [id])

    return {courseData, students}
}

export default FetchCourseIndividual