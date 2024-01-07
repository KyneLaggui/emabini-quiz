import React, { useEffect, useState } from 'react'
import Sidebar from '../../../components/Sidebar/Sidebar'
import PageLayout from '../../../layouts/pageLayout/PageLayout'
import "./FacultyCourse.scss"
import CourseFacultyCard from '../../../components/courseRelated/courseFacultyCard/CourseFacultyCard'
import SearchBar from '../../../components/filters/SearchBar'
import Sort from '../../../components/filters/Sort/Sort'
import Modal from 'react-modal';
import RecipientBox from '../../../components/courseRelated/recipientBox/RecipientBox'
import FacultyOnly from '../../../layouts/facultyOnly/FacultyOnly'
import { useSelector } from 'react-redux'
import { selectEmail, selectUserID } from '../../../redux/slice/authSlice'
import { supabase } from '../../../supabase/config'
import { toast } from "react-toastify";
import FetchCoursesFaculty from '../../../customHooks/fetchCoursesFaculty'
import { useNavigate } from 'react-router-dom'

class EmailError extends Error {
    constructor(message, field) {
      super(message);
      this.field = field;
      this.name = "EmailError";
    }
  }

const FacultyCourse = () => {
    // Form related variables states
    const [modalIsOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
            courseName: '',
            courseCode: '',
            students: [

            ],
            instructorId: ''
        }
    )

    // Form functions
    const onInputHandleChange = (event) => {
        const {name, value} = event.target;
        setFormData({
            ...formData,
            [name]: value
        })
      }

    const modifyStudentRecipients = (newArr) => {
        setFormData({
            ...formData,
            students: newArr
        })
    }

    // Prevents form submission upon pressing enter
    const handleKeyDown = (e) => {
        e.key === 'Enter' && e.preventDefault()
    }

    // Form submission when creating a new course
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const { data, error } = await supabase
            .from('course')
            .insert([{
                name: formData.courseName,
                code: formData.courseCode,
                instructor_id: formData.instructorId,
            }])
            .select()
            .single();
            
            if (data && formData.students) {
                const enrollees = await Promise.all((formData.students).map(async(student) => {    
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
                            course_code: formData.courseCode
                        }
                    } catch(error) {
                        toast.error(error.message)
                    }                                
                }))

                // In case the faculty did not decide to initially add students while creating the course
                if (!enrollees) return;

                console.log(enrollees)
                const { data, error } =  await supabase                
                .from('course_enrollee')
                .insert(enrollees)
                
                if (error) throw error;                
            }

            if (error) throw error;
            toast.success("Course successfully added!");
            setDataChange(!dataChange)
        } catch(error) {
            toast.error(error.message)
        }
        
    }

    // Modal functions
    function openModal() {
        setIsOpen(true);
    }
    
    function closeModal() {
        setIsOpen(false);
      }

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

    const [courses, setCourses] = useState([])

    const id = useSelector(selectUserID)
    const email = useSelector(selectEmail);
    const [dataChange, setDataChange] = useState(false)
    
    const navigate = useNavigate();

    const {coursesData} = FetchCoursesFaculty(id, dataChange)

    const handleClick = (id) => {
        console.log('okay')
        navigate(`/faculty-courses/${id}`)
    } 
    
    useEffect(() => {
        setFormData({
            ...formData,
            instructorId: id
        })

        setCourses(coursesData)
    }, [coursesData, id])

  return (
    <>
        <Sidebar></Sidebar>        
        <PageLayout>
            <FacultyOnly>
            <div className='courses-filters-container'>
                <div className='courses-filters-left'>
                    <button onClick={openModal}>Create Course</button>
                </div>
                <div className='courses-filters-right'>
                    <SearchBar></SearchBar>
                    <Sort></Sort>
                </div>                
            </div>
            
            <div className='courses-orie'>
                {courses.length === 0 ? (
                    <p>No courses found.</p>
                    ) : (                        
                        courses.map((course, i) => {
                            return (
                                <CourseFacultyCard {...course} key={i} onClick={() => handleClick(course['id'])}/>                                
                            )
                        })
                    )                
                }
            </div>

           <div>
                <Modal
                    isOpen={modalIsOpen}
                    // onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Registration Modal"
                >
                <form className='modal-main-cont' onSubmit={handleSubmit}>
                    <div className='modal-top'>
                        <h1>Create Course</h1>
                    </div>

                    <div className='modal-inputs'>
                        <div className='modal-each-input'>
                            <h1>Course Name:</h1>
                            <input type='text' placeholder='Enter Course Name...' name='courseName' onKeyDown={handleKeyDown} onChange={(e) => onInputHandleChange(e)} />
                        </div>
                        <div className='modal-each-input'>
                            <h1>Course Code:</h1>
                            <input type='text' placeholder='Enter Course Code...' name='courseCode' onKeyDown={handleKeyDown} onChange={(e) => onInputHandleChange(e)} />
                        </div>
                        <div className='modal-each-input'>
                            <h1>Students</h1>
                            <RecipientBox modifyStudentRecipients={modifyStudentRecipients}/>
                        </div>
                        <div className='sl-confirmation'>
                            <button className='sl-cancel' onClick={closeModal}>Cancel</button>
                            <button className='sl-save' >Confirm</button>
                        </div>
                        
                    </div>
                </form>
                </Modal>
            </div>                               
            </FacultyOnly>        
        </PageLayout>
    </>
  )
}

export default FacultyCourse