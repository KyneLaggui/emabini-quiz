import React, { useEffect, useState } from 'react'
import { supabase } from '../supabase/config';

const FetchCoursesFaculty = (id, dataChange) => {
    const [coursesData, setCoursesData] = useState([])

    useEffect(() => {
        const fetchCourses = async() => {
            if (id) {
                // Fetching the faculty member's registered courses as an instructor
                const coursesEnrolled = await supabase 
                .from('course')                
                .select()
                .eq('instructor_id', id)
                
                if (coursesEnrolled.data) {
                    // Store it in a temporary variable for it to be able to add another key to each
                    // object which is the enrolled students
                    let tempCourses = [];

                    // Fetching the registered courses with its name and code
                    const courseDetails = await Promise.all((coursesEnrolled.data).map(async(course) => {    
                        const courseData = await supabase
                        .from('course')
                        .select()
                        .eq('code', course['code'])
                        .single()

                        return courseData['data'];                        
                    }))

                    if (courseDetails) {
                        // Fetching the enrolled students in the registered courses
                        const courseFullDetails = await Promise.all((courseDetails).map(async(course) => {   
                            const courseStudents = await supabase
                                .from('course_enrollee')
                                .select()
                                .eq('course_code', course['code'])

                            const studentsArray = courseStudents.data || []
                            
                            tempCourses.push({
                                ...course,
                                students: studentsArray
                            })
                        }))     
                        setCoursesData(tempCourses)    
                    }                                  
                }
            }                                       
        }   
        
        fetchCourses();
    }, [id, dataChange])

    return {coursesData}
}

export default FetchCoursesFaculty