import React, { useEffect, useState } from 'react'
import "./FacultyStudentsList.scss"
import { IoRemoveCircle } from 'react-icons/io5';
import Modal from 'react-modal';
import RecipientBox from '../recipientBox/RecipientBox';

Modal.setAppElement('#root');
const FacultyStudentsList = ({ dynamicHeight, students }) => {
    const [modalIsOpen, setIsOpen] = useState(false);
    const [enrollView, setEnrollView] = useState(true);

    const [limitStudentNames, setLimitStudentNames] = useState([])

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

    useEffect(() => {
        if (students) {
            const limitedStudentNames = students.map((student) => {
            const fullName = `${student.first_name} ${student.middle_name} ${student.last_name}`
            return fullName.length > 25 ? `${fullName.slice(0, 22)}...` : fullName
            })
            setLimitStudentNames(limitedStudentNames)
        }
    }, [students])

  return (
    <div className='fsl-container' style={{ height: dynamicHeight }}>
        <div className='fsl-title-wrapper'>
            <h1>Students</h1>
            <p onClick={openModal}>View</p>
        </div>
        <div className='fsl-students-wrapper'>
                {limitStudentNames.length ? limitStudentNames.map((student, index) => (
                     <div className='fsl-students-settings' key={index}>
                        <h1 key={index}>{student}</h1>
                        <IoRemoveCircle onClick={(() => console.log('remove'))}/>
                    </div>
                )) : <p>No students yet.</p>}
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
                                {students.length ? students.map((student, index) => (
                                    <div className='modal-students-settings' key={index}>
                                        <h1 key={index}>{`${student.first_name} ${student.middle_name} ${student.last_name}`}</h1>
                                        <IoRemoveCircle />
                                    </div>
                                )) : <p>No students yet.</p>}
                            </div>
                        </>
                            
                    
                    : 
                        <>
                             <h1 className='sl-title'>Students</h1>
                             <div className='sl-enroll-container'>
                                <RecipientBox />
                                <button className='sl-csv'>Import CSV</button>

                                <div className='sl-confirmation'>
                                    <button className='sl-cancel' onClick={closeModal}>Cancel</button>
                                    <button className='sl-save' >Confirm</button>
                                </div>
                             </div>
                             
                            
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