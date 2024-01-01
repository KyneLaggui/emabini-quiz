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
                            throw new EmailError("One of the email(s) is not registered!", "email");
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
        } catch(error) {
            alert(error.message)
        }
        
    }

    // Modal functions
    function openModal() {
        setIsOpen(true);
    }
    
    function closeModal() {
        setIsOpen(false);
      }
    //   function afterOpenModal() {
    
    //     subtitle.style.color = '#f00';
    //   }

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

      useEffect(() => {
        setFormData({
            ...formData,
            instructorId: id
        })

        const fetchCourses = async() => {
            if (id) {
                // Fetching the faculty member's registered courses as an instructor
                const coursesEnrolled = await supabase 
                .from('course')                
                .select()
                .eq('instructor_id', id)

                if (coursesEnrolled.data) {
                    // Store it in a temporary variable for it to be able to add another key to each
                    // object which is the enrolled students
                    let tempCourses = coursesEnrolled.data;

                    // Fetching the registered courses with its name and code
                    const courseDetails = await Promise.all((coursesEnrolled.data).map(async(course) => {    
                        const courseData = await supabase
                        .from('course')
                        .select()
                        .eq('code', course['code'])
                        .single()

                        return courseData['data'];                        
                    }))

                    if (courseDetails) {
                        // Fetching the enrolled students in the registered courses
                        const courseFullDetails = await Promise.all((courseDetails).map(async(course) => {   
                            const courseStudents = await supabase
                                .from('course_enrollee')
                                .select()
                                .eq('course_code', course['code'])
                    
                            if (courseStudents.data) {
                                tempCourses = tempCourses.map((tempCourse) => {
                                    // Assigns a new to a course object with the key students which is an array
                                    if (tempCourse['code'] === course['code']) {
                                        return {
                                            ...tempCourse,
                                            students: courseStudents.data
                                        }
                                    }

                                    // In case there is no enrolled students in a certain course
                                    return {
                                        ...tempCourse,
                                        students: []
                                    }
                                })
                            }
                        }))     
                    }
                    // Finally setting the courses with their respective students
                    setCourses(tempCourses)
                }
            }                                       
        }   

        fetchCourses();
      }, [id])

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
                                <CourseFacultyCard {...course} key={i}/>                                
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