import React from 'react'
import "./EachStudentCourses.scss"
import Sidebar from '../../../components/Sidebar/Sidebar'
import PageLayout from '../../../layouts/pageLayout/PageLayout'
import { FaArrowLeft } from 'react-icons/fa'
import QuizzesOverview from '../../../components/courseRelated/quizzesOverview/QuizzesOverview'
import { CourseAnnouncements } from '../../../components/courseRelated/courseAnnouncements/CourseAnnouncements'
import Calendar from '../../../components/calendar/Calendar';




const EachStudentCourses = () => {
  return (
    <>
        <Sidebar></Sidebar>
        <PageLayout>
            <div className='esc-container'>
                <div className='back-courses'>
                    <FaArrowLeft name='back-arrow'/>
                    <p>Back to Courses</p>
                </div>

                <div className='courses-title'>
                    <h1>Operating Systems</h1>
                    <p>CMPE 30113</p>
                </div>

                <div className='courses-events'>
                    <CourseAnnouncements></CourseAnnouncements>
                    {/* <Calendar></Calendar> */}
                </div>

                <div className='courses-weeks'>
                    <QuizzesOverview />

                </div>
            </div>
            
        </PageLayout>
    </>
  )
}

export default EachStudentCourses