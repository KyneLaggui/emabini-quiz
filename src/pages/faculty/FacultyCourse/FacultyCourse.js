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
import MultiStep from 'react-multistep'
import { PiBooksFill, PiMathOperationsBold, PiPaintBrushFill } from "react-icons/pi";
import { MdScience, MdSportsFootball } from 'react-icons/md'
import { TiGroup } from "react-icons/ti";
import { IoMdCopy } from 'react-icons/io'

class EmailError extends Error {
    constructor(message, field) {
      super(message);
      this.field = field;
      this.name = "EmailError";
    }
  }

const FacultyCourse = () => {

    const [checkedItems, setCheckedItems] = useState({
        Math: false,
        Science: true,
        Language: false,
        Social_Studies: false,
        Sports: false,
        Arts: false
      });
    
    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        setCheckedItems({ ...checkedItems, [name]: checked });
    };

    const StepOne = ({ formData, setFormData, onInputHandleChange, handleKeyDown }) => {
        useEffect(() => {
            console.log('okay')
        }, [])

        return (
            <>
            <div className='course-information'>
                <div className='modal-each-input'>
                    <h1>Course Name:</h1>
                    <input type='text' placeholder='Enter Course Name...' name='courseName' onKeyDown={handleKeyDown} onChange={(e) => onInputHandleChange(e)}  value={formData['courseName']} />
                </div>
                <div className='modal-each-input'>
                    <h1>Course Code:</h1>
                    <input type='text' placeholder='Enter Course Code...' name='courseCode' onKeyDown={handleKeyDown} onChange={(e) => onInputHandleChange(e)} />
                </div>
            </div>
            
            </>
            
        );
    };

    const StepTwo = ({ formData, setFormData, onInputHandleChange, handleKeyDown }) => {
        return (
            <>
            <fieldset className="checkbox-group">
                <legend className="checkbox-group-legend">Choose Genre</legend>
                
                <div className="checkbox">
                    <label className="checkbox-wrapper">
                    <input
                        type="checkbox"
                        className="checkbox-input"
                        name="Math"
                        checked={checkedItems['Math']}
                        onChange={handleCheckboxChange}
                    />
                    <span className="checkbox-tile">
                        <PiMathOperationsBold size={30}/>
                        <span className="checkbox-label">Math</span>
                    </span>
                    </label>
                </div>
                <div className="checkbox">
                    <label className="checkbox-wrapper">
                    <input
                        type="checkbox"
                        className="checkbox-input"
                        name="Science"
                        checked={checkedItems['Science']}
                        onChange={handleCheckboxChange}
                    />
                    <span className="checkbox-tile">
                        <MdScience size={30} />
                        <span className="checkbox-label">Science</span>
                    </span>
                    </label>
                </div>
                <div className="checkbox">
                    <label className="checkbox-wrapper">
                    <input
                        type="checkbox"
                        className="checkbox-input"
                        name="Language"
                        checked={checkedItems['Language']}
                        onChange={handleCheckboxChange}
                    />
                    <span className="checkbox-tile">
                        <PiBooksFill size={30}/>
                        <span className="checkbox-label">Language</span>
                    </span>
                    </label>
                </div>
                <div className="checkbox">
                    <label className="checkbox-wrapper">
                    <input
                        type="checkbox"
                        className="checkbox-input"
                        name="Social_Studies"
                        checked={checkedItems['Social_Studies']}
                        onChange={handleCheckboxChange}
                    />
                    <span className="checkbox-tile">
                        <TiGroup size={30} />
                        <span className="checkbox-label">Social Studies</span>
                    </span>
                    </label>
                </div>
                <div className="checkbox">
                    <label className="checkbox-wrapper">
                    <input
                        type="checkbox"
                        className="checkbox-input"
                        name="Sports"
                        checked={checkedItems['Sports']}
                        onChange={handleCheckboxChange}
                    />
                    <span className="checkbox-tile">
                        <MdSportsFootball size={30}/>
                        <span className="checkbox-label">Sports</span>
                    </span>
                    </label>
                </div>
                <div className="checkbox">
                    <label className="checkbox-wrapper">
                    <input
                        type="checkbox"
                        className="checkbox-input"
                        name="Arts"
                        checked={checkedItems['Arts']}
                        onChange={handleCheckboxChange}
                    />
                    <span className="checkbox-tile">
                        <PiPaintBrushFill size={30}/>
                        <span className="checkbox-label">Arts</span>
                    </span>
                    </label>
                </div>
                
            </fieldset>
           
            </>
            
        );
    };

    const StepThree = ({ formData, setFormData, onInputHandleChange, handleKeyDown }) => {
        return (
            <>
                <div className='st-container'>
                    <h1 className='st-title'>Invite Students</h1>
                    <div className='st-self-enroll'>
                        <h1>Invite Code:</h1>
                        <button className='button-copy'>
                            <span className='button-text'>
                                CMPE1234    
                            </span>
                            <span className='copy-icon'><IoMdCopy size={20} /></span>
                            
                        </button>
                    </div>
                    <div className='st-add-manually'>
                        <h1>Add Manually:</h1>
                        <RecipientBox modifyStudentRecipients={modifyStudentRecipients}/>
                    </div>
                </div>
            </>
            
        );
    };

    const prevButton = {
        title : 'Back',
        style : {
            padding: '10px 20px',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--blue)',
            backgroundColor: 'var(--gray)',
            borderRadius: '8px',
            fontSize: '1rem',
            fontFamily: 'Inter, sans-serif',
            marginRight : '10px',

        }
    }
    const nextButton = {
        title : 'Proceed',
        style : {
            padding: '10px 20px',
            border: 'none',
            cursor: 'pointer',
            color: '#fff', 
            backgroundColor: 'var(--blue)',
            borderRadius: '8px',
            fontSize: '1rem',
            fontFamily: 'Inter, sans-serif'

        }
    }
    
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
        if (e.key === 'Enter') {
            e.preventDefault()
        }
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
          minHeight: '500px',
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


    const [currentStep, setCurrentStep] = useState(1);

    
    useEffect(() => {
        setFormData({
            ...formData,
            instructorId: id
        })

        setCourses(coursesData)
        console.log(formData)

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
                   
            
                    {/* <div className='modal-top'>
                    {/* <MultiStep title showNavigation={true} prevButton={prevButton} nextButton={nextButton} 
                            >
                                <StepOne
                                    title = "Course Information"
                                    formData={formData}
                                    setFormData={setFormData}
                                    onInputHandleChange={onInputHandleChange}
                                    handleKeyDown={handleKeyDown}
                                />
                                <StepTwo
                                    title = "Course Genre"
                                    formData={formData}
                                    onInputHandleChange={onInputHandleChange}
                                    handleKeyDown={handleKeyDown}
                                />
                                <StepThree 
                                    title = "Add Students"
                                    formData={formData}
                                    onInputHandleChange={onInputHandleChange}
                                    handleKeyDown={handleKeyDown}
                                />
                                
                                
                            </MultiStep> */}
             
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