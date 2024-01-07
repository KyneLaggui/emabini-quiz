import React, { useCallback, useEffect, useRef, useState } from 'react'
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
import { Link, useParams } from 'react-router-dom';
import FetchCourseIndividual from '../../../../customHooks/fetchCourseIndividual';
import { supabase } from '../../../../supabase/config';

const EachFacultyCourse = () => { 
    const { id } = useParams();

    const [enrolledStudents, setEnrolledStudents] = useState([])
    const [courseInfo, setCourseInfo] = useState(null)

    const {courseData, students}= FetchCourseIndividual(id)
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState([]);

    const [fslContainerHeight, setFslContainerHeight] = useState(0);
    const fslContainerRef = useCallback(node => {
      if (node) {
        const height = node.clientHeight;
        setFslContainerHeight(height);
      }
    }, []);

    useEffect(() => {
        setCourseInfo(courseData)
        setEnrolledStudents(students)

        // Initializing course info data
        if (courseData) {
          setFormData([courseData])
        }

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
      }, [fslContainerRef, courseData, students]);
      
  
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
  
    // const handleSaveClick = () => {
    //   setIsEditing(false);
    //   // Dito yung sa backend shits
    // };

    const handleSubmit = (e) => {
      e.preventDefault();
      setIsEditing(false);

      const changeCourseDetails = async() => {
        const { error } = await supabase
          .from('course')
          .update({
            code: formData[0].code,
            name: formData[0].name
          })
          .eq('id', id)
      }      
      
      changeCourseDetails();
    }
    console.log(courseData)
    return (
        <>
            <Sidebar></Sidebar>
            <PageLayout>
                <FacultyOnly>
                  <div className='esc-container'>
                      <Link className='back-courses' to='/faculty-courses'>                        
                          <FaArrowLeft name='back-arrow'/>
                          <p>Back to Courses</p>
                      </Link>
                      <form className='courses-editor' onSubmit={handleSubmit}>
                          <div className='courses-title'>
                              {formData.map((data, index) => (
                                  <div key={index}>
                                      {isEditing ? (
                                      <div className='courses-inputs'>
                                          <input
                                          type="text"
                                          value={data.name}
                                          onChange={(event) => handleFieldChange(event, index, 'name')}
                                          />
                                          <input
                                          type="text"
                                          value={data.code}
                                          onChange={(event) =>
                                              handleFieldChange(event, index, 'code')
                                          }
                                          />
                                      </div>
                                      ) : (
                                      <div>
                                          <h1>{data.name}</h1>
                                          <p>{data.code}</p>
                                      </div>
                                      )}
                                  </div>
                                  ))}
                          </div>
                          <div>
                              {isEditing ? (
                                  <button type="submit">
                                    <GiConfirmed size={23} color='var(--green)' className="on-hover"/>
                                  </button>
                              ) : (
                                  <HiPencil onClick={handleEditClick} className="on-hover" />
                              )}
                          </div>
                      </form>
                      

                      <div className='courses-events'>
                          {
                            courseInfo && (<CourseAnnouncements courseCode={courseInfo.code} {...courseData}></CourseAnnouncements>)
                          }                          
                          {/* <Calendar></Calendar> */}
                      </div>
                      
                      <div className='courses-information' ref={fslContainerRef}>
                          <div className='courses-weeks'>
                              <QuizzesFacultyOverview /> 
                          </div>
                          {
                            courseInfo && <FacultyStudentsList dynamicHeight={fslContainerHeight} students={enrolledStudents} {...courseData} />
                          }
                      </div>                    
                  </div>

                  
                </FacultyOnly>                                
            </PageLayout>
        </>
    );
  };

export default EachFacultyCourse