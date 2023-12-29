import React, { useState } from 'react'
import './AccountManagementHeader.scss';
import Modal from 'react-modal';
import { FaX } from "react-icons/fa";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { supabase } from '../../../supabase/config';



Modal.setAppElement('#root');

const AccountManagementHeader = () => {
    // A variable that is somehow used on the react modal
    let subtitle;

    // States
    const [modalIsOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        role: 'student',
        firstName: '',
        middleName: '',
        lastName: ''
      })

    const customStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          background: '#F3F6FF',
          borderRadius: '5px',
          width: '100%',
          maxWidth: '500px',
          padding: '40px 40px 20px 40px'
        },
        
      };

      // Modal functions
    function openModal() {
        setIsOpen(true);
      }
    
      function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#f00';
      }
    
      function closeModal() {
        setIsOpen(false);
      }


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
            const { data, error } = await supabase.auth.signUp(
                // Need to lowercase email to safely compare it in the future
                {
                    email: formData.email.toLowerCase(),
                    password: formData.password,
                    options: {
                        data: {
                            full_name: formData.fullName,
                            role: formData.role,
                            firstName: formData.firstName,
                            middleName: formData.middleName,
                            lastName: formData.lastName,
                        }
                    }
                }
            )
            if (error) throw error;
            alert("Check the email(s) for the email verification.")

        } catch(error) {
            alert(error);
        }
      }

  return (
    <div className="account-management-header">
        <div className="buttons">
            <button onClick={openModal}>Create</button>
            <button>Import CSV</button>
        </div>
        <div>
            Searchbar
        </div>
        
        <div>       
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Registration Modal"
            >   
                <div className="registration-modal-inner-wrapper">                
                    <p ref={(_subtitle) => (subtitle = _subtitle)} style={{ display: 'none'}}>Create an Account</p>
                    <p>Create an Account</p>
                    <button onClick={closeModal} className="close-modal-button">
                        <FontAwesomeIcon icon={faCircleXmark} className="icon"/>
                    </button>
                    <form className="registration-form" onSubmit={handleSubmit}>
                        <div className="row">
                            <label>First Name:</label>
                            <input type="text" name='firstName' onChange={(e) => onInputHandleChange(e)} />
                        </div>                        
                        <div className="row">
                            <label>Middle Name:</label>
                            <input type="text" name='middleName' onChange={(e) => onInputHandleChange(e)} />
                        </div>                        
                        <div className="row">
                            <label>Last Name:</label>
                            <input type="text" name='lastName' onChange={(e) => onInputHandleChange(e)} />
                        </div>                        
                        <div className="row">
                            <label htmlFor="">Email:</label>
                            <input type="text" name='email' onChange={(e) => onInputHandleChange(e)} />
                        </div>
                        <div className="row">
                            <label htmlFor="">Password:</label>
                            <input type="text" name='password' onChange={(e) => onInputHandleChange(e)} />
                        </div>
                        <div className="row">
                            <label htmlFor="">Role:</label>
                            <select name="role" id="" onChange={(e) => onInputHandleChange(e)}>
                                <option value="student">Student</option>
                                <option value="faculty">Faculty</option>
                                <option value="faculty admin">Faculty Admin</option>
                            </select>
                        </div>       
                        <button type="submit" className="register-button">Register</button>                                         
                    </form>
                </div>
            </Modal>
        </div>
    </div>
  )
}

export default AccountManagementHeader