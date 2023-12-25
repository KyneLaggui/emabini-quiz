import React, { useState } from 'react'
import './AccountManagementHeader.scss';
import Modal from 'react-modal';
import { FaX } from "react-icons/fa";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';



Modal.setAppElement('#root');

const AccountManagementHeader = () => {
    let subtitle;

    const [modalIsOpen, setIsOpen] = useState(false);

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
                    <form className="registration-form">
                        <div className="row">
                            <label>Full Name:</label>
                            <input type="text" />
                        </div>
                        <div className="row">
                            <label htmlFor="">Account ID:</label>
                            <input type="text" />
                        </div>
                        <div className="row">
                            <label htmlFor="">Email:</label>
                            <input type="text" />
                        </div>
                        <div className="row">
                            <label htmlFor="">Password:</label>
                            <input type="text" />
                        </div>
                        <div className="row">
                            <label htmlFor="">Role:</label>
                            <input type="text" />
                        </div>                                                
                    </form>
                </div>
            </Modal>
        </div>
    </div>
  )
}

export default AccountManagementHeader