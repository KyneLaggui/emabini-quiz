import React from 'react'
import "./CourseFacultyCard.scss"
import { Link } from 'react-router-dom'
import { MdGroup } from 'react-icons/md'
import { IoIosMore } from 'react-icons/io'

const CourseFacultyCard = ({courseCode, courseTitle, courseStudents}) => {
  return (
    <div className="cf-card-container">
      <div className="cf-card-cover"></div>
      <div className='cf-card-wrapper'>
        <div className="cf-card-detail">
          <p className="cf-card-code"><Link>{courseCode}</Link></p>
          <p className="cf-card-title"><Link>{courseTitle}</Link></p>
          
            <div className="cf-card-user-container">
              <MdGroup />
              <p>{courseStudents} students</p>
            </div>
         
        </div>
        <IoIosMore />
      </div>
      
    </div>
  )
}

export default CourseFacultyCard