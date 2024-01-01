import React, { useEffect, useState } from 'react'
import "./CourseFacultyOverview.scss"
import CourseCarousel from '../courseCarousel/CourseCarousel'
import CourseFacultyCard from '../courseFacultyCard/CourseFacultyCard'
import { useSelector } from 'react-redux'
import { supabase } from '../../../supabase/config'
import { selectUserID } from '../../../redux/slice/authSlice'

const CourseFacultyOverview = () => {

    const [courses, setCourses] = useState([])

    const id = useSelector(selectUserID)
    
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
                    let tempCourses = coursesEnrolled.data;

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
                    
                            if (courseStudents.data) {
                                tempCourses = tempCourses.map((tempCourse) => {
                                    // Assigns a new to a course object with the key students which is an array
                                    if (tempCourse['code'] === course['code']) {
                                        return {
                                            ...tempCourse,
                                            students: courseStudents.data
                                        }
                                    }

                                    // In case there is no enrolled students in a certain course
                                    return {
                                        ...tempCourse,
                                        students: []
                                    }
                                })
                            }
                        }))     
                    }
                    // Finally setting the courses with their respective students
                    setCourses(tempCourses)
                }
            }                                       
        }   

        fetchCourses();
        }, [id])

  return (
        <div className="course-overview-wrapper">
            <p className="bold medium-text">Courses Overview</p>
            {courses.length === 0 ? (
                <p>No courses found.</p>
            ) : (
                <CourseCarousel>
                    {courses.map((course, i) => {
                        return (
                            <CourseFacultyCard {...course} key={i}/>
                        )
                    })}
                </CourseCarousel>
            )
        
        }
            
        </div>
  )
}

export default CourseFacultyOverview