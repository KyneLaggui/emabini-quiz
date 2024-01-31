import { useEffect, useState } from "react";
import "./Sidebar.scss";
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { HiAcademicCap } from "react-icons/hi2";
import { FaHome, FaBookOpen, FaChartBar, FaEllipsisH, FaUser } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import { supabase } from "../../supabase/config";
import { REMOVE_ACTIVE_USER, selectUserID } from "../../redux/slice/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { FacultyHeadOnlyLink, FacultyOnlyLink, StudentOnlyLink } from "../../layouts/linkRestrictions/LinkRestriction";
import { toast } from "react-toastify";
import FetchUserProfile from "../../customHooks/fetchUserProfile";
import { IoNewspaperSharp } from "react-icons/io5";

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

    // For updating the dynamic name
    const [fullName, setFullName] = useState('') 
    const id = useSelector(selectUserID)
    const { userData } = FetchUserProfile(id)

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
            
            toast.success('Successfully logged out!')
            navigate("/")
        }         
    }

    useEffect(() => {
        if (userData) {
            setFullName(`${userData.first_name} ${userData.middle_name} ${userData.last_name}`)
        }
    }, [userData])

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
                        <span>eMabini.</span>
                    </div>
                    <IoMenu id="btn" onClick={() => {
                            setShow(!show)
                            setShowSettings(false)
                        }        
                    }/>
                </div>
                <ul>
                    {/* For student links */}
                    <StudentOnlyLink>
                        <li>
                            <NavLink to="/student-home" className={activeLink}> 
                                <FaHome className={`link-icon`}/>
                                <span className={`nav-item bold`}>Home</span>
                            </NavLink>      
                            <span className={`tooltip bold`}>Home</span>        
                        </li>
                    </StudentOnlyLink>                    
                    <StudentOnlyLink>
                        <li>
                            <NavLink to="/student-courses" className={activeLink}> 
                                <FaBookOpen className={`link-icon`}/>
                                <span className={`nav-item bold`}>Courses</span>
                            </NavLink>      
                            <span className={`tooltip bold`}>Courses</span>        
                        </li>
                    </StudentOnlyLink>                    
                    <StudentOnlyLink>
                        <li>
                            <NavLink to="/student-progress" className={activeLink}> 
                                <FaChartBar className={`link-icon`}/>
                                <span className={`nav-item bold`}>Progress</span>
                            </NavLink>      
                            <span className={`tooltip bold`}>Progress</span>        
                        </li>  
                    </StudentOnlyLink>
            
                    {/* For faculty links */}
                    <FacultyOnlyLink>
                        <li>
                            <NavLink to="/faculty-home" className={activeLink}> 
                                <FaHome className={`link-icon`}/>
                                <span className={`nav-item bold`}>Home</span>
                            </NavLink>      
                            <span className={`tooltip bold`}>Home</span>        
                        </li>
                    </FacultyOnlyLink>  
                    <FacultyOnlyLink>
                        <li>
                            <NavLink to="/faculty-courses" className={activeLink}> 
                                <FaBookOpen className={`link-icon`}/>
                                <span className={`nav-item bold`}>Courses</span>
                            </NavLink>      
                            <span className={`tooltip bold`}>Courses</span>        
                        </li>
                    </FacultyOnlyLink>
                    <FacultyOnlyLink>
                        <li>
                            <NavLink to="/faculty-quizzes" className={activeLink}> 
                                <IoNewspaperSharp className={`link-icon`}/>
                                <span className={`nav-item bold`}>Quizzes</span>
                            </NavLink>      
                            <span className={`tooltip bold`}>Quizzes</span>        
                        </li>
                    </FacultyOnlyLink>     

                    {/* For faculty head link(s) */}
                    <FacultyHeadOnlyLink>
                        <li>
                            <NavLink to="/account-management" className={activeLink}> 
                                <FaUser className={`link-icon`}/>
                                <span className={`nav-item bold`}>Account</span>
                            </NavLink>      
                            <span className={`tooltip bold`}>Account</span>        
                        </li>
                    </FacultyHeadOnlyLink>  

                                      
                </ul>
                <div className="user">
                    <div className="user-info">
                        <p className="bold">{fullName}</p>
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