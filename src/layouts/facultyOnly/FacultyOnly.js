import React, { useEffect, useState } from 'react'
import { supabase } from '../../supabase/config';
import { useNavigate } from 'react-router-dom';
import { selectUserID } from '../../redux/slice/authSlice';
import { useSelector } from 'react-redux';
import FetchUserProfile from '../../customHooks/fetchUserProfile';

const FacultyOnly = ({ children }) => {

    const navigate = useNavigate();

    const id = useSelector(selectUserID)
    
    const userData = FetchUserProfile(id)
    
    useEffect(() => {
        const getSession = async() => {            
            const { data: { user } } = await supabase.auth.getUser();
            if (!user || (userData && (userData.role !== "faculty admin" && userData.role !== "faculty"))) {
                navigate("/")
            }                        
        }
        getSession()
        
    }, [id, navigate, userData])
   
    
  return (
    <div>{children}</div>
  )
}

export default FacultyOnly