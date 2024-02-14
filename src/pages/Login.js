import React, { useEffect, useState } from 'react'
import { supabase } from '../supabase/config';
import './Login.scss';
import { useNavigate } from 'react-router-dom';
import FetchUserProfile from '../customHooks/fetchUserProfile';
import { useSelector } from 'react-redux';
import { selectUserID } from '../redux/slice/authSlice';
import PageLayout from '../layouts/pageLayout/PageLayout';
import Loader from '../components/loader/Loader';
import LoginPicture from "../assets/login-pic.png"
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import Swal from 'sweetalert2';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('');
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
           
            if (error) {
                throw error;
                
            } else {
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer)
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                    })
            
                    Toast.fire({
                    icon: 'success',
                    title: 'Successfully Login',
                    
                })
                navigate("/student-home")
            }
        } catch (error) {
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
                })
        
                Toast.fire({
                icon: 'error',
                title: "Credentials Invalid",
            })
        }
    };

    // const handleSubmit = async (event) => {
    //     event.preventDefault();

    //     try {
    //         const { data, error } = await supabase.auth.signInWithPassword(
    //             {
    //                 email: formData.email,
    //                 password: formData.password,
    //             }
    //         )
            
    //         if (error) throw error;
    //         alert("Successfully logged in!")
    //         navigate("/student-home")
            

    //     } catch(error) {
    //             alert(error);
    //     }
    // }
    
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

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
      };

    return (
        <PageLayout>
            {
                isLoading || isLoadingProfile ? <Loader /> : (
                <div className="login-modal-inner-wrapper">
                    
                    <form className="login-form" onSubmit={handleSubmit}>                    
                        <div className='login-left'>
                            <h1>eMabini.</h1>
                            <div className='login-inputs'>
                                <div className='input-style'>
                                    <input type="text" name='email' placeholder= "Email" onChange={(e) => onInputHandleChange(e)}/>
                                </div>
                                <div className='input-style-password'>
                                    <input type={showPassword ? 'text' : 'password'}  name='password'  placeholder= "Password" onChange={(e) => onInputHandleChange(e)} />
                                    <span 
                                        className='password-toggle' 
                                        onClick={togglePasswordVisibility}
                                    >
                                        {showPassword ?  <FaRegEye size={18} /> : <FaRegEyeSlash size={18} /> }
                                    </span>
                                </div>
                               
                            </div>
                           
                        
                        
                            <a className='forgot-password'>Forgot Password?</a>

                            <button type="submit" className="login-button">Login</button>  
                        </div>

                        <div className='login-right'>
                            <img src={LoginPicture} className='login-pic' alt='logpic'/>

                            
                        </div>
                        <div className='circle1'></div>
                        <div className='circle2'></div>
                           
                        
                                
                                                               
                    </form>
                        
                </div>
                )
            }
            
        </PageLayout>
        
    )

    
}

export default Login