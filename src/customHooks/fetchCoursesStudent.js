import React, { useEffect, useState } from 'react'
import { supabase } from '../supabase/config';

const FetchCoursesStudent = (id, email) => {
    const [coursesData, setCoursesData] = useState([])

    useEffect(() => {
        const fetchCourses = async() => {
            if (id) {
                // Fetching the student's enrolled courses
                const coursesEnrolled = await supabase
                .from('course_enrollee')
                .select()
                .eq('email', email)

                if (coursesEnrolled.data) {
                    // Store it in a temporary variable for it to be able to add another key to each
                    // object which is the enrolled students
                    let tempCourses = coursesEnrolled.data;
                    
                    // Fetching the registered courses with its name and code
                    const courseDetails = await Promise.all((coursesEnrolled.data).map(async(course) => {   
                        const courseData = await supabase
                        .from('course')
                        .select()
                        .eq('code', course['course_code'])
                        .single()

                        return courseData['data'];                        
                    }))

                    if (courseDetails) {
                        tempCourses = courseDetails;
                    }            
                    // Finally setting the courses with their respective students
                    setCoursesData(tempCourses)
                }
            }                                       
        }   

        fetchCourses();
      }, [id, email])

    return {coursesData}
}

export default FetchCoursesStudent