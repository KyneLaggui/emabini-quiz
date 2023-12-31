import './StudentCourse.scss';
import React, { useEffect, useState } from 'react'
import PageLayout from '../../../layouts/pageLayout/PageLayout';
import CourseCard from '../../../components/courseRelated/courseCard/CourseCard'
import Sidebar from '../../../components/Sidebar/Sidebar';
import SearchBar from '../../../components/filters/SearchBar';
import Sort from '../../../components/filters/Sort/Sort';
import StudentOnly from '../../../layouts/studentOnly/StudentOnly';
import { useSelector } from 'react-redux';
import { selectEmail, selectUserID } from '../../../redux/slice/authSlice';
import { supabase } from '../../../supabase/config';



const StudentCourse = () => {

    const [courses, setCourses] = useState([])

    const email = useSelector(selectEmail);

    useEffect(() => {   
        const fetchCourses = async() => {
            const coursesEnrolled = await supabase 
            .from('course_enrollee')
            .select()
            .eq('email', email)
            
            if (coursesEnrolled.data) {
                const courseDetails = await Promise.all((coursesEnrolled.data).map(async(course) => {    
                    const courseData = await supabase
                     .from('course')
                     .select()
                     .eq('code', course['course_code'])
                     .single()
                     
                     return courseData;
                }))
                setCourses(courseDetails)
            }
        }   

        fetchCourses();
    }, [email])

    console.log(courses)
  return (
    <>
        <Sidebar></Sidebar>
        <PageLayout>
            <StudentOnly>
                <div className='courses-filters-container'>
                    <SearchBar></SearchBar>
                    <Sort></Sort>
                </div>
                <div className='courses-orie'>
                    {courses.length === 0 ? (
                        <p>No courses found.</p>
                        ) : (
                            
                            courses.map((course, i) => {
                                return (
                                    <CourseCard {...course.data} key={i}/>                                    
                                )
                            })
                        )
                    
                    }
                </div>
            </StudentOnly>            
        </PageLayout>
    </>
  )
}

export default StudentCourse