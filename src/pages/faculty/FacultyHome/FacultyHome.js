import React from 'react'
import './FacultyHome.scss';
import Sidebar from '../../../components/Sidebar/Sidebar';
import PageLayout from '../../../layouts/pageLayout/PageLayout';
import ProfileDetailsHeader from '../../../components/profileDetailsHeader/ProfileDetailsHeader';
import Announcements from '../../../components/announcements/Announcements';
import Calendar from '../../../components/calendar/Calendar';
import QuizOverview from '../../../components/quizRelated/QuizOverview/QuizOverview';
import CourseFacultyOverview from '../../../components/courseRelated/courseFacultyOverview/CourseFacultyOverview';
import FacultyOnly from '../../../layouts/facultyOnly/FacultyOnly';


const FacultyHome = () => {
  return (
    <>
        <Sidebar></Sidebar>
        <PageLayout>
            <FacultyOnly>
              <div className="faculty-home-wrapper">
                  <ProfileDetailsHeader />
                  <div className="announcements-calendar-container">
                      <Announcements />
                      <Calendar />
                  </div>
                  <CourseFacultyOverview></CourseFacultyOverview>        
                  <QuizOverview></QuizOverview>
              </div>    
            </FacultyOnly>            
        </PageLayout>
    </>
  )
}

export default FacultyHome