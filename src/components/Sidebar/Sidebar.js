import { useState } from "react";
import "./Sidebar.scss";
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { HiAcademicCap } from "react-icons/hi2";
import { FaHome, FaBookOpen, FaChartBar, FaEllipsisH } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";

const activeLink = ({isActive, isPending}) => 
  (isActive ? `active navlink` : "navlink")

const Sidebar = () => {
    const [show, setShow] = useState(false);

    return (
        <>  
            <div className={`secondary-sidebar ${show ? "active" : ""}`}>
                <IoMenu id="secondary-btn" onClick={() => setShow(!show)}/>
                <div className="cover">

                </div>
            </div>
            <div className={`sidebar ${show ? "active" : ""}`}>
                <div className={`top`}>
                    <div className={`logo`}>
                        <HiAcademicCap id="main-logo"/>
                        <span>eMabini</span>
                    </div>
                    <IoMenu id="btn" onClick={() => setShow(!show)}/>
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
                    <div>
                        <FaEllipsisH id="sidebar-ellipsis"/>
                    </div>
                </div>
            </div>
        </>
    );
}
 
export default Sidebar;