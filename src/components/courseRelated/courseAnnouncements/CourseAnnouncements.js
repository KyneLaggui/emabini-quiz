import { useEffect, useState } from "react";
import "./CourseAnnouncements.scss"
import Modal from 'react-modal';
import { CiCircleMore } from "react-icons/ci";
import Multiselect from 'multiselect-react-dropdown';
import { supabase } from "../../../supabase/config";
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { IoCalendarOutline } from 'react-icons/io5';
import { AiOutlineSync } from 'react-icons/ai';
import { Link } from "react-router-dom";
import FetchCourseAnnouncement from "../../../customHooks/fetchCourseAnnouncements";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

Modal.setAppElement('#root');

export const CourseAnnouncements = ({ courseCode, code, name, role }) => {
    const [announcements, setAnnouncements] = useState([])
    const [formData, setFormData] = useState({
        title: '',
        course: code,
        content: ''
    })


    const [scheduleDate, setScheduleDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    
    const [dataChange, setDataChange] = useState(false);
    const {announcementsData} = FetchCourseAnnouncement(code, dataChange)

    const changeDateHandler = (e) => {
        e.preventDefault();
        setShowDatePicker(!showDatePicker);
    }

    const courses = [
        { id: 1, name: courseCode },   
    ];

    const selectStyles = {
        multiselectContainer: {
            padding: "0.5rem",
            background: "white",
            "min-width" : "500px"                        
        },
        searchBox: {
            border: "none",
            color: "black",
        },
        chips: { 
            background: "var(--redLO)"
        },
        option: { 
            background: "var(--gray)",
            color: 'var(--blue)',
            
        },
    }      

    const [modalIsOpen, setIsOpen] = useState(false);
    const [announcementView, setAnnouncementView] = useState(true);

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
  
    function closeModal() {
      setIsOpen(false);
    }

    const toggleView = () => {
      setAnnouncementView(!announcementView); 
    };

    // Form functions
    const onInputHandleChange = (event) => {
        const {name, value} = event.target;
        setFormData({
            ...formData,
            [name]: value
        })                    
    }  

    const formatDate = (date) => {
        const formattedDate = date.toLocaleString();
        const dateArray = formattedDate.split(",")
        return dateArray;
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        try {
            const formattedDate = formatDate(scheduleDate);
            const date = formattedDate[0];
    
            const insertAnnouncement = async() => {
                const { error } = await supabase
                .from('course_announcement')
                .insert({
                    title: formData.title,
                    course_code: formData.course,
                    content: formData.content,
                    timestampz: ((scheduleDate).toISOString()).toLocaleString('zh-TW')
                })
                
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
                    title: 'Announcement Created',
                    
                })
                setDataChange(!dataChange)
            }
    
            insertAnnouncement();   

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
                icon: 'error',
                title: error,
                
            })
        }
              
    }

    useEffect(() => {
        setAnnouncements(announcementsData);
    }, [announcementsData]) 


  return (
    <div className='ca-container'>
        <h1>Announcements</h1>
        
        {announcements.length === 0 ? (
            <p>No Announcements</p>
            ) : (
                
                announcements.map((announce, i) => {
                    return (
                        <div className='each-announcements-container' key={i}>
                            <h3>{announce.title}</h3>
                            <p>{new Date(announce.timestampz).toLocaleDateString()}</p>
                        </div>
                    )
                })
            )        
        }

        <div className="ca-modal">
            <p onClick={openModal}>See all Announcements</p>
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
                    {                        
                        !role && <div className="modal-toggle">
                            <button
                                className={!announcementView  ? 'active-button' : 'inactive-button'}
                                onClick={() =>  setAnnouncementView(false)}
                            >
                                Create
                            </button>
                            <button
                                className={announcementView  ? 'active-button' : 'inactive-button'}
                                onClick={() => setAnnouncementView(true)}
                            >
                                View
                            </button>
                        </div>
                    }
                    
                </div>
                                
                <div className={`modal-details ${announcementView  ? 'enroll-view' : 'existing-view'}`}>
                    {announcementView ? 
                        <>
                            {announcements.length === 0 ? (
                            <p>No Announcements</p>
                            ) : (
                                <div className="ea-container-modal" >
                                    {
                                         announcements.map((announce, i) => {
                                            return (
                                                    <div key={i}>
                                                    <div className="ea-wrapper-modal">
                                                        <div className="ea-cm-left" key={i}>
                                                            <div className="ea-settings-wrapper">
                                                                <div className="eas-title">
                                                                    <h1>{announce.title}</h1>
                                                                    <div>
                                                                        <h3>{new Date(announce.timestampz).toLocaleDateString()}</h3>
                                                                        <h3 className="time">{new Date(announce.timestampz).toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'})}</h3>
                                                                    </div>
                                                                </div>
                                                                <CiCircleMore 
                                                                    size={18}
                                                                    color="var(--blue)" /> 
                                                            </div>
                                                            
                                                            <p>{announce.content}</p>
    
                                                            </div>
                                                    
                                                    </div>
                                                    
                                                    </div>
                                            )
                                        })
                                    }
                                </div>
                               
                            )
                        
                        }
                        </>                                                
                    : 
                        <>                                                    
                            <form className='ma-inputs' onSubmit={handleSubmit}>
                                <div className='modal-announcement-input title-date-container'>
                                    <div>
                                        <h1>Announcement Title:</h1>
                                        <input type='text' placeholder='Enter Announcement Title...' name="title" onChange={(e) => onInputHandleChange(e)}/>
                                    </div>
                                    <div className="date-icon">
                                        <DatePicker 
                                            selected={scheduleDate} 
                                            onChange={(date) => { setScheduleDate(date); console.log(date)}} 
                                            minDate={new Date()}
                                            maxDate={new Date(new Date(new Date().getTime() + 60 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US'))}
                                            className="date-picker" 
                                            popperPlacement="bottom-end" // Change here
                                            popperModifiers={{
                                                preventOverflow: {
                                                  enabled: true,
                                                },
                                              }}                                                
                                            showTimeInput                                       
                                        />
                                    </div>  
                                </div>
                                <div className='modal-announcement-input'>
                                    <h1>Assign to:</h1>
                                    <Multiselect
                                    options={courses}
                                    selectedValues={[courses[0]]}
                                    displayValue="name" 
                                    placeholder="Select Courses"
                                    style= {selectStyles}
                                    singleSelect={true}
                                    disable={true}
                                    name="course"
                                    />
                                </div>

                                <div className='modal-announcement-input'>
                                    <h1>Announcement Content:</h1>
                                    <textarea type='text' placeholder='Enter Content...' name="content" onChange={(e) => onInputHandleChange(e)}/>
                                </div>                                                    
                                <div className='ca-confirmation'>
                                    <button className='ca-cancel' onClick={closeModal}>Cancel</button>
                                    <button className='ca-save' type="submit">Confirm</button>
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
