import React, { useEffect, useState } from 'react'
import "./EachStudentCourses.scss"
import Sidebar from '../../../../components/Sidebar/Sidebar'
import PageLayout from '../../../../layouts/pageLayout/PageLayout'
import { FaArrowLeft } from 'react-icons/fa'
import QuizzesOverview from '../../../../components/courseRelated/quizzesOverview/QuizzesOverview'
import { CourseAnnouncements } from '../../../../components/courseRelated/courseAnnouncements/CourseAnnouncements'
import Calendar from '../../../../components/calendar/Calendar';
import StudentOnly from '../../../../layouts/studentOnly/StudentOnly'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectEmail, selectUserID } from '../../../../redux/slice/authSlice'
import FetchStudentQuizzes from '../../../../customHooks/fetchStudentQuizzes'
import FetchCourseIndividual from '../../../../customHooks/fetchCourseIndividual'

const EachStudentCourses = () => {
    const id = useSelector(selectUserID)
    const email = useSelector(selectEmail);
    const {courseId} = useParams()

    
    const {courseData} = FetchCourseIndividual(courseId)

    const navigate = useNavigate()

    const [courseDetails, setCourseDetails] = useState({
        title: "",
        code: ""
    })

    useEffect(() => {
        if (courseData) {
            setCourseDetails({
                title: courseData.name,
                code: courseData.code
            })
        }
    }, [courseData])


  return (
    <>
        <Sidebar></Sidebar>
        <PageLayout>
            <StudentOnly>
                <div className='esc-container'>
                    <Link to='/student-courses'>
                        <div className='back-courses'>
                            <FaArrowLeft name='back-arrow'/>
                                <p>Back to Courses</p>                        
                        </div>
                    </Link>
                    <div className='courses-title'>
                        <h1>{courseDetails.title}</h1>
                        <p>{courseDetails.code}</p>
                    </div>
                    <div className='courses-events'>
                        <CourseAnnouncements courseCode={courseDetails.code} {...courseData} role='student'></CourseAnnouncements>
                        {/* <Calendar></Calendar> */}
                    </div>
                    <div className='courses-weeks'>
                        {
                            courseData && <QuizzesOverview email={email} courseCode={courseData.code}/>
                        }
                    </div>
                </div>
            </StudentOnly>                        
        </PageLayout>
    </>
  )
}

export default EachStudentCourses