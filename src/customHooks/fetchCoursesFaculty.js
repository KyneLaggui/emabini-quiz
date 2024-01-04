import React, { useEffect, useState } from 'react'
import { supabase } from '../supabase/config';

const FetchCoursesFaculty = (id) => {
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
                            // if (courseStudents.data) {                                                                    
                            //     tempCourses = tempCourses.map((tempCourse) => {
                            //         // Assigns a new to a course object with the key students which is an array
                            //         if (tempCourse['code'] === course['code']) {                               
                            //             return {
                            //                 ...tempCourse,
                            //                 students: courseStudents.data
                            //             }
                            //         }

                            //         // In case there is no enrolled students in a certain course
                            //         return {
                            //             ...tempCourse,
                            //             students: []
                            //         }
                            //     })
                            //     console.log(tempCourses)
                            //     // Finally setting the courses with their respective students
                                 
                            // }
                        }))     
                        setCoursesData(tempCourses)    
                    }                                  
                }
            }                                       
        }   

        // const fetchCourses = async () => {
        //     if (id) {
        //         const coursesEnrolled = await supabase
        //             .from('course')
        //             .select()
        //             .eq('instructor_id', id);
        
        //         if (coursesEnrolled.data) {
        //             let tempCourses = [];
        
        //             const courseDetails = await Promise.all(
        //                 coursesEnrolled.data.map(async (course) => {
        //                     const courseData = await supabase
        //                         .from('course')
        //                         .select()
        //                         .eq('code', course['code'])
        //                         .single();
        
        //                     return courseData['data'];
        //                 })
        //             );
        
        //             if (courseDetails) {
        //                 await Promise.all(
        //                     courseDetails.map(async (course) => {
        //                         const courseStudents = await supabase
        //                             .from('course_enrollee')
        //                             .select()
        //                             .eq('course_code', course['code']);
        
        //                         const studentsArray = courseStudents.data || [];
        
        //                         tempCourses.push({
        //                             ...course,
        //                             students: studentsArray,
        //                         });
        //                     })
        //                 );
        
        //                 // Set the courses data outside the loop
        //                 setCoursesData(tempCourses);
        //             }
        //         }
        //     }
        // };
        
        fetchCourses();
    }, [id])

    return {coursesData}
}

export default FetchCoursesFaculty