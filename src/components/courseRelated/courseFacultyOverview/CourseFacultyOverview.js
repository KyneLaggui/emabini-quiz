import React, { useEffect, useState } from 'react'
import "./CourseFacultyOverview.scss"
import CourseCarousel from '../courseCarousel/CourseCarousel'
import CourseFacultyCard from '../courseFacultyCard/CourseFacultyCard'
import { useSelector } from 'react-redux'
import { supabase } from '../../../supabase/config'
import { selectUserID } from '../../../redux/slice/authSlice'
import { useNavigate } from 'react-router-dom'
import FetchCoursesFaculty from '../../../customHooks/fetchCoursesFaculty'

const CourseFacultyOverview = () => {

    const [courses, setCourses] = useState([])

    const id = useSelector(selectUserID)
    const {coursesData} = FetchCoursesFaculty(id)
    const navigate = useNavigate();

    const handleClick = (id) => {
        navigate(`/faculty-courses/${id}`)
    } 

    useEffect(() => {
        setCourses(coursesData)
    }, [coursesData])


  return (
        <div className="course-overview-wrapper">
            <p className="eb-semi-titles">Courses Overview</p>
            {courses.length === 0 ? (
                <p>No courses found.</p>
            ) : (
                <CourseCarousel>
                    {courses.map((course, i) => {
                        return (
                            <CourseFacultyCard {...course} key={i} onClick={() => handleClick(course['id'])}/>
                        )
                    })}
                </CourseCarousel>
            )
        
        }
            
        </div>
  )
}

export default CourseFacultyOverview