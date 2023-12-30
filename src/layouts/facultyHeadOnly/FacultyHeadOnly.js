import React, { useEffect, useState } from 'react'
import { supabase } from '../../supabase/config';
import { useNavigate } from 'react-router-dom';
import { selectUserID } from '../../redux/slice/authSlice';
import { useSelector } from 'react-redux';
import FetchUserProfile from '../../customHooks/fetchUserProfile';
import Loader from '../../components/loader/Loader';

// For faculty head role pages only
const FacultyHeadOnly = ({ children }) => {

    const [isLoading, setIsLoading] = useState(true)

    const navigate = useNavigate();

    const id = useSelector(selectUserID)

    const { userData, isLoadingProfile } = FetchUserProfile(id)

    useEffect(() => {
        const getSession = async() => {            
          const { data: { user } } = await supabase.auth.getUser();
          if (!user) {
              navigate("/")
            } else if (userData && (userData.role !== "faculty admin" && userData.role !== "student")) {
              navigate("/faculty-home")
            } else if (userData && (userData.role !== "faculty admin" && userData.role !== "faculty")) {
              navigate("/student-home")
            }         

          // Removes loading screen if it is confirmed that there is a proper user role            
          if (user && userData) {
              setIsLoading(false)
          }                 
        }
        getSession()
        
    }, [id, navigate, userData])
   
    
  return (
    <div>
      {isLoading || isLoadingProfile ? <Loader /> : children}
    </div>
  )
}

export default FacultyHeadOnly