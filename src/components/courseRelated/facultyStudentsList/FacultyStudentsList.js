import React, { useState } from 'react'
import "./FacultyStudentsList.scss"
import { IoRemoveCircle } from 'react-icons/io5';
import Modal from 'react-modal';
import RecipientBox from '../recepientBox/RecepientBox';

Modal.setAppElement('#root');
const FacultyStudentsList = ({ dynamicHeight }) => {
    
    const [modalIsOpen, setIsOpen] = useState(false);
    const [enrollView, setEnrollView] = useState(true);

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
          maxWidth: '600px',
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

      const toggleView = () => {
        setEnrollView(!enrollView); // Switch between enroll and existing views
    };

    const studentNames = [
        'Jason Buhamid',
        'Jason Downbad',
        'Amadough',
        'Harold Anderson',
        'Harold Anderson Amadeus Belpussy',
        'Jason Downbad',
        'Amadough',
        'Harold Anderson Amadeus Belpussy',
        'Jason Buhamid',
        'Jason Downbad',
        'Amadough',
        'Harold Anderson',
        'Jason Buhamid',
        'Jason Downbad',
        'Amadough',
        'Harold Anderson Amadeus Belpussy',
       
      ];

      const limitStudentNames = studentNames.map(name =>
        name.length > 25 ? `${name.slice(0, 22)}...` : name
    );

  return (
    <div className='fsl-container' style={{ height: dynamicHeight }}>
        <div className='fsl-title-wrapper'>
            <h1>Students</h1>
            <p onClick={openModal}>View</p>
        </div>
        <div className='fsl-students-wrapper'>
                {limitStudentNames.map((student, index) => (
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
            <div className='modal-main-cont'>
                <div className='modal-top'>
                    <div className='modal-top-left'>
                        <h1>Operating Systems</h1>
                        <p>CMPE 30113</p>
                    </div>
                    <div className="modal-toggle">
                        <button
                            className={!enrollView ? 'active-button' : 'inactive-button'}
                            onClick={() => setEnrollView(false)}
                        >
                            Enroll
                        </button>
                        <button
                            className={enrollView ? 'active-button' : 'inactive-button'}
                            onClick={() => setEnrollView(true)}
                        >
                            Existing
                        </button>
                    </div>
                </div>

                
                
                <div className={`modal-details ${enrollView ? 'enroll-view' : 'existing-view'}`}>
                    {enrollView ? 
                        <>
                            <h1 className='sl-title'>Students</h1>
                            <div className='students-list'>
                                
                                {studentNames.map((student, index) => (
                                    <div className='modal-students-settings'>
                                        <h1 key={index}>{student}</h1>
                                        <IoRemoveCircle />
                                    </div>
                                ))}
                            </div>
                        </>
                            
                    
                    : 
                        <>
                             <h1 className='sl-title'>Students</h1>
                             <RecipientBox />
                        </>
                    }
                </div>
                    
               
            </div>
                
            </Modal>
        </div>
      
    </div>
    
    
  )
}

export default FacultyStudentsList