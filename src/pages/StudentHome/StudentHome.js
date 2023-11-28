import './StudentHome.scss';
import Sidebar from "../../components/Sidebar/Sidebar";
import PageLayout from '../../layouts/pageLayout/PageLayout';
import ProfileDetailsHeader from '../../components/profileDetailsHeader/ProfileDetailsHeader';
import StudentOverview from '../../components/studentOverview/StudentOverview';
import Announcements from '../../components/announcements/Announcements';

const StudentHome = () => {
    return (
        <>  
            <Sidebar></Sidebar>
            <PageLayout>
                <div className="student-home-wrapper">
                    <ProfileDetailsHeader />
                    <StudentOverview />
                    <Announcements />
                </div>                
            </PageLayout>
        </>
    );
}
 
export default StudentHome;