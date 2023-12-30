import React, { useEffect, useRef, useState } from 'react'
import Sidebar from '../../../../components/Sidebar/Sidebar';
import PageLayout from '../../../../layouts/pageLayout/PageLayout';
import { CourseAnnouncements } from '../../../../components/courseRelated/courseAnnouncements/CourseAnnouncements';

import { FaArrowLeft } from 'react-icons/fa';
import "./EachFacultyCourse.scss"
import { HiPencil } from 'react-icons/hi2';
import { GiConfirmed } from "react-icons/gi";
import QuizzesFacultyOverview from '../../../../components/courseRelated/quizzesFacultyOverview/QuizzesFacultyOverview';
import FacultyStudentsList from '../../../../components/courseRelated/facultyStudentsList/FacultyStudentsList';
import FacultyOnly from '../../../../layouts/facultyOnly/FacultyOnly';

const EachFacultyCourse = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState([
      { courseName: 'Operating Systems', courseCode: 'CMPE 30113' }
    ]);

    const [fslContainerHeight, setFslContainerHeight] = useState(0);
    const fslContainerRef = useRef(null);

    

    useEffect(() => {
        function handleResize() {
          if (fslContainerRef.current) {
            const height = fslContainerRef.current.clientHeight;
            setFslContainerHeight(height);
          }
        }
    
        handleResize();
        window.addEventListener('resize', handleResize);
    
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);
      
  
    const handleEditClick = () => {
      setIsEditing(true);
    };
  
    const handleFieldChange = (event, index, fieldName) => {
      const updatedData = [...formData];
      updatedData[index] = {
        ...updatedData[index],
        [fieldName]: event.target.value,
      };
      setFormData(updatedData);
    };
  
    const handleSaveClick = () => {
      setIsEditing(false);
      // Dito yung sa backend shits
    };
  
    return (
      
        <>
            <Sidebar></Sidebar>
            <PageLayout>
                <FacultyOnly>
                  <div className='esc-container'>
                      <div className='back-courses'>
                          <FaArrowLeft name='back-arrow'/>
                          <p>Back to Courses</p>
                      </div>
                      <div className='courses-editor'>
                          <div className='courses-title'>
                              {formData.map((data, index) => (
                                  <div key={index}>
                                      {isEditing ? (
                                      <div className='courses-inputs'>
                                          <input
                                          type="text"
                                          value={data.courseName}
                                          onChange={(event) => handleFieldChange(event, index, 'courseName')}
                                          />
                                          <input
                                          type="text"
                                          value={data.courseCode}
                                          onChange={(event) =>
                                              handleFieldChange(event, index, 'courseCode')
                                          }
                                          />
                                      </div>
                                      ) : (
                                      <div>
                                          <h1>{data.courseName}</h1>
                                          <p>{data.courseCode}</p>
                                      </div>
                                      )}
                                  </div>
                                  ))}
                          </div>
                          <div>
                              {isEditing ? (
                                  
                                  <GiConfirmed  onClick={handleSaveClick} size={23} color='var(--green)' />
                              ) : (
                                  <HiPencil onClick={handleEditClick} />
                              )}
                          </div>
                      </div>
                      

                      <div className='courses-events'>
                          <CourseAnnouncements></CourseAnnouncements>
                          {/* <Calendar></Calendar> */}
                      </div>
                      
                      <div className='courses-information' ref={fslContainerRef}>
                          <div className='courses-weeks'>
                              <QuizzesFacultyOverview /> 
                          </div>
                          <FacultyStudentsList dynamicHeight={fslContainerHeight} />
                      </div>                    
                  </div>

                  
                </FacultyOnly>                                
            </PageLayout>
        </>
    );
  };

export default EachFacultyCourse