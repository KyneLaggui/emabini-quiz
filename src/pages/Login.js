import React, { useState } from 'react'
import { supabase } from '../supabase/config';
import './Login.scss';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const navigate = useNavigate();

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
        navigate("/")
           

     } catch(error) {
            alert(error);
        }
    }

    return (
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

export default Login