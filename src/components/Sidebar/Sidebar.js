import { useState } from "react";
import "./Sidebar.scss";
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { HiAcademicCap } from "react-icons/hi2";
import { FaHome, FaBookOpen, FaChartBar, FaEllipsisH } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import { supabase } from "../../supabase/config";
import { REMOVE_ACTIVE_USER } from "../../redux/slice/authSlice";
import { useDispatch } from "react-redux";

const activeLink = ({isActive, isPending}) => 
  (isActive ? `active navlink` : "navlink")

const Sidebar = () => {
    const [show, setShow] = useState(false);
    const [showSettings, setShowSettings] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const toggleSettings = () => {
        setShowSettings(current => !current);
    }

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            alert(error)
            return
        }
        else {
            dispatch(
                REMOVE_ACTIVE_USER()
            );
            
            alert("Logged out successfully!")
            navigate("/login")
        } 
        
    }

    return (
        <>  
            <div className={`secondary-sidebar ${show ? "active" : ""}`}>
                <IoMenu id="secondary-btn" onClick={() => {
                    setShow(!show)
                    setShowSettings(false)
                    }                    
                }/>
                <div className="cover">

                </div>
            </div>
            <div className={`sidebar ${show ? "active" : ""}`}>
                <div className={`top`}>
                    <div className={`logo`}>
                        <HiAcademicCap id="main-logo"/>
                        <span>eMabini</span>
                    </div>
                    <IoMenu id="btn" onClick={() => {
                            setShow(!show)
                            setShowSettings(false)
                        }        
                    }/>
                </div>
                <ul>
                    <li>
                        <NavLink to="/" className={activeLink}> 
                            <FaHome className={`link-icon`}/>
                            <span className={`nav-item bold`}>Home</span>
                        </NavLink>      
                        <span className={`tooltip bold`}>Home</span>        
                    </li>
                    <li>
                        <NavLink to="/student-courses" className={activeLink}> 
                            <FaBookOpen className={`link-icon`}/>
                            <span className={`nav-item bold`}>Courses</span>
                        </NavLink>      
                        <span className={`tooltip bold`}>Courses</span>        
                    </li>
                    <li>
                        <NavLink to="/student-progress" className={activeLink}> 
                            <FaChartBar className={`link-icon`}/>
                            <span className={`nav-item bold`}>Progress</span>
                        </NavLink>      
                        <span className={`tooltip bold`}>Progress</span>        
                    </li>                    
                </ul>
                <div className="user">
                    <div className="user-info">
                        <p className="bold">Amado Nino Rei Punzalandsdsds</p>
                        <p className="student-number">2021-05787-MN-0</p>
                    </div>
                    <div className="mini-settings-container">
                        <FaEllipsisH id="sidebar-ellipsis" onClick={toggleSettings}/>
                        <div className={`${!showSettings ? 'hidden' : 'active'} mini-settings`}>
                            <div onClick={handleLogout}>Log out</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
 
export default Sidebar;