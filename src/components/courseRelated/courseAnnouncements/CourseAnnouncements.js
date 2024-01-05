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

Modal.setAppElement('#root');

export const CourseAnnouncements = ({ courseCode, code, name }) => {
    
    const [announcements, setAnnouncements] = useState([])
    const [formData, setFormData] = useState({
        title: '',
        course: code,
        content: ''
    })

    const [scheduleDate, setScheduleDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
  
    const changeDateHandler = (e) => {
        e.preventDefault();
        setShowDatePicker(!showDatePicker);
    }

    // const announcements = [
    //     {
    //         announcementTitle : 'CPU Scheduling Examination',
    //         announcementDate : 'November 16, 2023',
    //         announcementContent: 'Get ready for the examination of the CPU Scheduling Examination',
    //     },
    //     {
    //         announcementTitle : 'CPU Scheduling Examination',
    //         announcementDate : 'November 16, 2023',
    //         announcementContent: 'Get ready for the examination of the CPU Scheduling Examination',
    //     },
    //     {
    //         announcementTitle : 'Midterm Examination',
    //         announcementDate : 'November 23, 2023',
    //         announcementContent: 'Only use pantindahan calculator',
    //     },
    //     {
    //         announcementTitle : 'Midterm Examination',
    //         announcementDate : 'November 23, 2023',
    //         announcementContent: 'Only use pantindahan calculator',
    //     },
    //     {
    //         announcementTitle : 'Midterm Examination',
    //         announcementDate : 'November 23, 2023',
    //         announcementContent: 'Get ready for the examination of the CPU Scheduling ExaminationGet ready for the examination of the CPU Scheduling ExaminationGet ready for the examination of the CPU Scheduling ExaminationGet ready for the examination of the CPU Scheduling Examination',
    //     },            
    // ]

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

    const handleSubmit = (event) => {
        event.preventDefault();

        const insertAnnouncement = async() => {
            const { error } = await supabase
            .from('course_announcement')
            .insert({
                title: formData.title,
                course_code: formData.course,
                content: formData.content,
                date: scheduleDate
            })
        }

        insertAnnouncement();        
    }

    const ExampleCustomTimeInput = ({ date, value, onChange }) => (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={{ border: "solid 1px pink" }}
        />
      );

    // useEffect(() => {
        
    //     setCourse([

    //     ])
    // }, []) 

  return (
    <div className='ca-container'>
        <h1>Announcements</h1>
        
        {announcements.length === 0 ? (
            <p>No Announcements</p>
            ) : (
                
                announcements.map((announce, i) => {
                    return (
                        <div className='each-announcements-container' key={i}>
                            <h3>{announce.announcementTitle}</h3>
                            <p>{announce.announcementDate}</p>
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
                    <div className="modal-toggle">
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
                                                                    <h1>{announce.announcementTitle}</h1>
                                                                    <h3>{announce.announcementDate}</h3>
                                                                </div>
                                                                <CiCircleMore 
                                                                    size={18}
                                                                    color="var(--blue)" /> 
                                                            </div>
                                                            
                                                            <p>{announce.announcementContent}</p>
    
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
                                        <IoCalendarOutline size={40}  to="/" onClick={(e) => changeDateHandler(e)}/>
                                        <DatePicker 
                                            selected={scheduleDate} 
                                            onChange={(date) => { setScheduleDate(date); setShowDatePicker(false) }} 
                                            open={showDatePicker} 
                                            className="date-picker" 
                                            popperPlacement="bottom"

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
