import React, { useState } from 'react'
import Sidebar from '../../../components/Sidebar/Sidebar'
import PageLayout from '../../../layouts/pageLayout/PageLayout'
import "./FacultyCourse.scss"
import CourseFacultyCard from '../../../components/courseRelated/courseFacultyCard/CourseFacultyCard'
import SearchBar from '../../../components/filters/SearchBar'
import Sort from '../../../components/filters/Sort/Sort'
import Modal from 'react-modal';
import RecipientBox from '../../../components/courseRelated/recipientBox/RecipientBox'

const FacultyCourse = () => {
    const courses = [
        {
            courseCode: 'CMPE 10113',
            courseTitle: 'Operating Systems',
            courseStudents : '24'
        },
        {
            courseCode: 'CMPE 40062',
            courseTitle: 'Web Development',
            courseStudents : '24'
        },
        {
            courseCode: 'CMPE 30113',
            courseTitle: 'Software Design',
            courseStudents : '24'
        },
        {
            courseCode: 'CMPE 30043',
            courseTitle: 'Discrete Mathematics',
            courseStudents : '24'
        },
        {
            courseCode: 'MATH 20053',
            courseTitle: 'Calculus 2',
            courseStudents : '24'
        },
        {
            courseCode: 'PHED 10022',
            courseTitle: 'Rhythmic Activities',
            courseStudents : '24'
        },
    
    ]

    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal() {
        setIsOpen(true);
      }
    
    //   function afterOpenModal() {
    
    //     subtitle.style.color = '#f00';
    //   }
    
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
    
  return (
    <>
        <Sidebar></Sidebar>
        <PageLayout>
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
                <div className='modal-main-cont'>
                    <div className='modal-top'>
                        <h1>Create Course</h1>
                    </div>

                    <div className='modal-inputs'>
                        <div className='modal-each-input'>
                            <h1>Course Name:</h1>
                            <input type='text' placeholder='Enter Course Name...'/>
                        </div>
                        <div className='modal-each-input'>
                            <h1>Course Code:</h1>
                            <input type='text' placeholder='Enter Course Code...'/>
                        </div>
                        <div className='modal-each-input'>
                            <h1>Students</h1>
                            <RecipientBox />
                        </div>
                        <div className='sl-confirmation'>
                            <button className='sl-cancel' onClick={closeModal}>Cancel</button>
                            <button className='sl-save' >Confirm</button>
                        </div>
                        
                    </div>

                    
                    
                
                </div>
                </Modal>
            </div>    
                    
               
        
                
            
        
        </PageLayout>
    </>
  )
}

export default FacultyCourse