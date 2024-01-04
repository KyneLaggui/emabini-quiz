import React, { useEffect, useState } from 'react'
import "./CourseFacultyCard.scss"
import { Link } from 'react-router-dom'
import { MdGroup } from 'react-icons/md'
import { IoIosMore } from 'react-icons/io'
import CourseQuizSettings from '../../settingsDropdown/CourseQuizSettings'

const CourseFacultyCard = ({code, name, students, onClick}) => {
  const [studentCount, setStudentCount] = useState("0")
  
  useEffect(() => { 
    if (students) {
      if (students.length === 0) {
        setStudentCount("No students")
      } else if (students.length === 1) {
        setStudentCount(`1 student`)
      } else if (students.length > 1) {
        setStudentCount(`${students.length} students`)
      }
    }
    
  }, [students])

  return (
    <div className="cf-card-container" onClick={onClick}>
      <div className="cf-card-cover"></div>
      <div className='cf-card-wrapper'>
        <div className="cf-card-detail">
          <p className="cf-card-code"><Link>{code}</Link></p>
          <p className="cf-card-title"><Link>{name}</Link></p>
          
            <div className="cf-card-user-container">
              <MdGroup />
              <p>{studentCount}</p>
            </div>
         
        </div>
        <CourseQuizSettings></CourseQuizSettings>
      </div>
      
    </div>
  )
}

export default CourseFacultyCard