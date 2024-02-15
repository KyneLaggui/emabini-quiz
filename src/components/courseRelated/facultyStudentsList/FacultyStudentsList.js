import React, { useEffect, useState } from 'react'
import "./FacultyStudentsList.scss"
import { IoRemoveCircle } from 'react-icons/io5';
import Modal from 'react-modal';
import RecipientBox from '../recipientBox/RecipientBox';
import { supabase } from '../../../supabase/config';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

class EmailError extends Error {
    constructor(message, field) {
      super(message);
      this.field = field;
      this.name = "EmailError";
    }
}

Modal.setAppElement('#root');
const FacultyStudentsList = ({ dynamicHeight, students, code, name }) => {
    const [modalIsOpen, setIsOpen] = useState(false);
    const [enrollView, setEnrollView] = useState(true);

    const [limitStudentNames, setLimitStudentNames] = useState([])

    // For the student enrollment list
    const [formData, setFormData] = useState([]);

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
    
      // Modal functions
    function openModal() {
        setIsOpen(true);
      }
    
      function closeModal() {
        setIsOpen(false);
      }

      const toggleView = () => {
        setEnrollView(!enrollView); // Switch between enroll and existing views
    };

    const modifyStudentRecipients = (newArr) => {
        setFormData(newArr)
    }

    // Form submission when enrolling new students in a certain course
    const handleSubmit = async(event) => {
        event.preventDefault();
        try {
            const enrollees = await Promise.all((formData
                ).map(async(student) => {    
                // Another try catch block since thrown errors inside map function are not caught 
                // by the parent try catch block   
                try {
                    const { count, error } = await supabase
                    .from('profiles')
                    .select('email', { count: 'exact', head: true })
                    .eq('email', student.toLowerCase())
                    
    
                    if (count < 1) {
                        throw new EmailError(`${student.toLowerCase()} is not a registered email!`, "email");
                    }
    
                    return {
                        email: student.toLowerCase(),
                        course_code: code
                    }
    
                } catch(error) {
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
                        icon: error,
                        title: error,
                        
                    })
                }                                
            }))
    
            // In case the faculty did not decide to initially add students while creating the course
            if (!enrollees) return;

            const { data, error } =  await supabase                
            .from('course_enrollee')
            .insert(enrollees)
            
            if (error) throw error;   
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
                title: 'Students Enrolled',
                
            })

        } catch(error) {
            if (error.message === "duplicate key value violates unique constraint \"course_enrollee_pkey\"") {
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
                    title: 'One of the student(s) is already enrolled!',
                    
                })
                
            }
        }
        
    }

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
                        <h1>{name}</h1>
                        <p>{code}</p>
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
                             <form className='sl-enroll-container' onSubmit={handleSubmit}>
                                <RecipientBox  modifyStudentRecipients={modifyStudentRecipients}/>
                                {/* <button className='sl-csv'>Import CSV</button> */}

                                <div className='sl-confirmation'>
                                    <button className='sl-cancel' onClick={closeModal}>Cancel</button>
                                    <button className='sl-save' >Confirm</button>
                                </div>
                             </form>
                             
                            
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