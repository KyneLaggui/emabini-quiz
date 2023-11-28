import { FaBell } from "react-icons/fa";
import './Announcements.scss';

const Announcements = () => {
    return (
        <>  
        <div className="announcements-container">
            <div className="top-announcement"> 
                <div>
                    <p className="bold announcements-word">Announcements</p>
                    <p className="bold announcements-current-date">July 16, 2023</p>
                </div>
                <div className="notif-bell-container">
                    <FaBell class="notif-icon"/>
                </div>
            </div>
            <div className="announcements-preview">

            </div>
        </div>
            
        </>
    );
}
 
export default Announcements;