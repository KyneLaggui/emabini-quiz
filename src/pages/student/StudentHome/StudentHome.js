import './StudentHome.scss';
import Sidebar from "../../../components/Sidebar/Sidebar";
import PageLayout from '../../../layouts/pageLayout/PageLayout';
import ProfileDetailsHeader from '../../../components/profileDetailsHeader/ProfileDetailsHeader';
import StudentOverview from '../../../components/studentOverview/StudentOverview';
import Announcements from '../../../components/announcements/Announcements';
import Calendar from '../../../components/calendar/Calendar';
import CourseOverview from '../../../components/courseRelated/coursesOverview/CourseOverview';
import StudentOnly from '../../../layouts/studentOnly/StudentOnly';

const StudentHome = () => {
    
    return (
        <>  
            <Sidebar></Sidebar>
            <PageLayout>
                <StudentOnly>
                    <div className="student-home-wrapper">
                        <ProfileDetailsHeader />
                        <StudentOverview />
                        <div className="announcements-calendar-container">
                            <Announcements />
                            <Calendar />
                        </div>                    
                        <CourseOverview />
                    </div>  
                </StudentOnly>                              
            </PageLayout>
        </>
    );
}
 
export default StudentHome;