import React, { useEffect, useState } from 'react'
import "./CourseFacultyCard.scss"
import { Link } from 'react-router-dom'
import { MdGroup } from 'react-icons/md'
import { IoIosMore } from 'react-icons/io'
import CourseQuizSettings from '../../settingsDropdown/CourseQuizSettings'
import { FaTrash } from 'react-icons/fa'
import Swal from 'sweetalert2'
import { supabase } from '../../../supabase/config'

const CourseFacultyCard = ({code, name, students, onClick, onDelete}) => {
  const [studentCount, setStudentCount] = useState("0")
  
  const confirmDelete = (e) => {
    e.stopPropagation()

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        const deleteCourse = async() => {
          const {data, error} = await supabase.from('course')
          .delete()
          .eq('code', code)
          .select()

          if (!(error)) {
            Swal.fire({
              title: "Deleted!",
              text: "The course been deleted.",
              icon: "success"
            });

            onDelete()
          }
        }
        
        deleteCourse()
        
      }
    });
  }

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
        {/* <CourseQuizSettings></CourseQuizSettings> */}
      </div>
      <FaTrash className="trash-icon" onClick={(e) => confirmDelete(e)}/>
      
    </div>
  )
}

export default CourseFacultyCard