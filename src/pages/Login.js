import React, { useEffect, useState } from 'react'
import { supabase } from '../supabase/config';
import './Login.scss';
import { useNavigate } from 'react-router-dom';
import FetchUserProfile from '../customHooks/fetchUserProfile';
import { useSelector } from 'react-redux';
import { selectUserID } from '../redux/slice/authSlice';
import PageLayout from '../layouts/pageLayout/PageLayout';
import Loader from '../components/loader/Loader';

const Login = () => {

    const navigate = useNavigate();
    const id = useSelector(selectUserID)
    const { userData, isLoadingProfile } = FetchUserProfile(id) 

    const [isLoading, setIsLoading] = useState(true)

    const [formData, setFormData] = useState({
        email: '',
        password: '',
      })

    // Form functions
    const onInputHandleChange = (event) => {
        const {name, value} = event.target;
        setFormData({
            ...formData,
            [name]: value
        })
      }
    
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const { data, error } = await supabase.auth.signInWithPassword(
                {
                    email: formData.email,
                    password: formData.password,
                }
            )
            
            if (error) throw error;
            alert("Successfully logged in!")
            navigate("/student-home")
            

        } catch(error) {
                alert(error);
        }
    }
    // Check whether if a user is already logged in and their type of role
    useEffect(() => {
        const getSession = async() => {            
            const { data: { user } } = await supabase.auth.getUser();
            if (user && (userData && (userData.role === "student"))) {
                navigate("/student-home")
            } else if (user && (userData && (userData.role === "faculty" || userData.role === "faculty admin"))) {
                navigate("/faculty-home")
            }                    
            if (!user) {
                setIsLoading(false)
            }
        }

        getSession()        
    }, [id, navigate, userData])

    return (
        <PageLayout>
            {
                isLoading || isLoadingProfile ? <Loader /> : (
                <div className="login-modal-inner-wrapper">
                        <form className="login-form" onSubmit={handleSubmit}>                    
                            <div className="row">
                                <label htmlFor="">Email:</label>
                                <input type="text" name='email' onChange={(e) => onInputHandleChange(e)} />
                            </div>
                            <div className="row">
                                <label htmlFor="">Password:</label>
                                <input type="text" name='password' onChange={(e) => onInputHandleChange(e)} />
                            </div>      
                            <button type="submit" className="login-button">Login</button>                                         
                        </form>
                    </div>
                )
            }
            
        </PageLayout>
        
    )

    
}

export default Login