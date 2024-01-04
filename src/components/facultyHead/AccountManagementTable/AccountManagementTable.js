import React, { useEffect, useState } from 'react'
import './AccountManagementTable.scss';
import FetchAllUserProfile from '../../../customHooks/fetchAllUserProfiles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPen, faUserXmark, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-modal';
import { FaX } from "react-icons/fa";
import { supabase } from '../../../supabase/config';


const AccountManagementTable = () => {
  // A variable that is somehow used on the react modal
  let subtitle;

  const [users, setUsers] = useState([])

  const { profiles } = FetchAllUserProfile()

  const [modalIsOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    role: '',
    firstName: '',
    middleName: '',
    lastName: ''
  })

  const options = [
    'student', 
    'faculty',
    'faculty admin'
  ]

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
    function openModal(email, firstName, middleName, lastName, role) {
      setIsOpen(true);
      setFormData({
        email,
        role,
        firstName,
        middleName,
        lastName
      })
    }
  
    function afterOpenModal() {
      // references are now sync'd and can be accessed.
      subtitle.style.color = '#f00';
    }
  
    function closeModal() {
      setIsOpen(false);
    }
  
    // Form functions for edit profile
    const onInputHandleChange = (event) => {
      const {name, value} = event.target;
      setFormData({
          ...formData,
          [name]: value
      })
    }

    const handleSubmit = (e) => {
      e.preventDefault();

      const updateProfile = async() => {
        const newEmail = formData.email.toLowerCase()

        const { data, error } = await supabase
        .from('profiles')
        .update({
          email: newEmail,
          first_name: formData.firstName,
          middle_name: formData.middleName,
          last_name: formData.lastName,
          role: formData.role,
        })    
        .eq('email', newEmail)
        .select()

        console.log(data)
      }

      updateProfile()
    }

    useEffect(() => {
      if (profiles) {
        setUsers(profiles)
      }
    }, [profiles])

  return (
    <div className="account-management-table">
        <table>
            <thead>
                <tr>
                    <th>Full Name</th>
                    <th>Account ID</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Actions</th>
                </tr>                
            </thead>
            <tbody>
              {
                (users && users.length)
                ? (
                  users.map((user, index) => {
                    const {id, email, first_name,  middle_name, last_name, role} = user;
                    return (
                      <tr key={id}>
                      <td>
                        {`${first_name} ${middle_name} ${last_name}`}
                      </td>
                      <td>
                        {id}
                      </td>
                      <td>  
                        {email}
                      </td>
                      <td>
                        {role}
                      </td>
                      <td className="flexbox">
                        <FontAwesomeIcon 
                          icon={faUserPen} 
                          style={{color: "green"}} 
                          className="on-hover" 
                          onClick={() => openModal(email, first_name, middle_name, last_name, role)}
                        />
                        <FontAwesomeIcon icon={faUserXmark} style={{color: "red"}} className="on-hover" />
                      </td>
                      </tr>
                    )
                  })) : (
                    <tr>
                      <p>No users found.</p>
                    </tr>             
                  )
              }   
            </tbody>
        </table>
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
                            <input type="text" name='firstName' value={formData.firstName} onChange={(e) => onInputHandleChange(e)} />
                        </div>                        
                        <div className="row">
                            <label>Middle Name:</label>
                            <input type="text" name='middleName' value={formData.middleName} onChange={(e) => onInputHandleChange(e)} />
                        </div>                        
                        <div className="row">
                            <label>Last Name:</label>
                            <input type="text" name='lastName' value={formData.lastName} onChange={(e) => onInputHandleChange(e)} />
                        </div>                        
                        <div className="row">
                            <label htmlFor="">Email:</label>
                            <input type="text" name='email' value={formData.email} onChange={(e) => onInputHandleChange(e)} />
                        </div>

                        <div className="row">
                            <label htmlFor="">Role:</label>
                            <select name="role" id="" onChange={(e) => onInputHandleChange(e)} className="capitalize">
                              {
                                options.length > 1 && (
                                  options.map((option, idx) => {
                                    if (option === formData.role) {
                                      return (
                                        <option value={option} className="capitalize" selected>{option}</option>
                                      )
                                    } else {
                                      return (
                                        <option value={option} className="capitalize">{option}</option>
                                      )
                                    }
                                  })
                                )
                              }                            
                            </select>
                        </div>       
                        <button type="submit" className="register-button">Save Changes</button>                                         
                    </form>
                </div>
            </Modal>
          </div>
    </div>
    )
}

export default AccountManagementTable