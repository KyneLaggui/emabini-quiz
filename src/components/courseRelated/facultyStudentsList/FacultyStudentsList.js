import React, { useState } from 'react'
import "./FacultyStudentsList.scss"
import { IoRemoveCircle } from 'react-icons/io5';
import Modal from 'react-modal';

Modal.setAppElement('#root');
const FacultyStudentsList = ({ dynamicHeight }) => {
    
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
    
    //   function afterOpenModal() {
    
    //     subtitle.style.color = '#f00';
    //   }
    
      function closeModal() {
        setIsOpen(false);
      }

    const studentNames = [
        'Jason Buhamid',
        'Jason Downbad',
        'Amadough',
        'Harold Anderson',
        'Jason Buhamid',
        'Jason Downbad',
        'Amadough',
        'Harold Anderson',
        'Jason Buhamid',
        'Jason Downbad',
        'Amadough',
        'Harold Anderson',
        'Jason Buhamid',
        'Jason Downbad',
        'Amadough',
        'Harold Anderson',
       
      ];

  return (
    <div className='fsl-container' style={{ height: dynamicHeight }}>
        <div className='fsl-title-wrapper'>
            <h1>Students</h1>
            <p onClick={openModal}>View</p>
        </div>
        <div className='fsl-students-wrapper'>
                {studentNames.map((student, index) => (
                     <div className='fsl-students-settings'>
                        <h1 key={index}>{student}</h1>
                        <IoRemoveCircle />
                    </div>
                ))}
        </div>
        <div>       
            <Modal
                isOpen={modalIsOpen}
                // onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Registration Modal"
            >   
                
            </Modal>
        </div>
      
    </div>
    
    
  )
}

export default FacultyStudentsList