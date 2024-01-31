import { FaBell } from "react-icons/fa";
import './Announcements.scss';

const Announcements = () => {
    return (
        <>  
        <div className="announcements-container">
            <div className="top-announcement"> 
                <div>
                    <p className="eb-semi-titles blue">Announcements</p>
                    <p className="eb-standard red">July 16, 2023</p>
                </div>
                <div className="notif-bell-container">
                    <FaBell className="notif-icon"/>
                </div>
            </div>
            <div className="announcements-preview">
                <div className="announcement-preview-row">
                    No classes for today!
                </div>
            </div>
        </div>
            
        </>
    );
}
 
export default Announcements;