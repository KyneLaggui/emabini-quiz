import React, { useEffect, useState } from 'react'
import { supabase } from '../../supabase/config';
import { useNavigate } from 'react-router-dom';
import { selectUserID } from '../../redux/slice/authSlice';
import { useSelector } from 'react-redux';

const FacultyHeadOnly = ({ children }) => {
    const [user, setUser] = useState(null)

    const navigate = useNavigate();

    const id = useSelector(selectUserID)
    
    useEffect(() => {
        const getSession = async() => {
            if (id) {
                let userData = await supabase.from("profiles")
                .select("*")
                .eq('id', id)
                .single();   
            
                setUser(userData['data']);
            }
            
        }
        
        getSession()

        // if (!user || user.role !== "faculty admin") {
        //     navigate("/")
        // }

    }, [id, navigate, user])
    
    
    

  return (
    <div>{children}</div>
  )
}

export default FacultyHeadOnly