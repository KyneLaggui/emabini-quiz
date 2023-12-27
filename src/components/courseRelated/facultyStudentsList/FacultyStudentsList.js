import React from 'react'
import "./FacultyStudentsList.scss"
import { IoRemoveCircle } from 'react-icons/io5';

const FacultyStudentsList = () => {
    const studentNames = [
        'Jason Buhamid',
        'Jason Downbad',
        'Amadough',
        'Harold Anderson',
        'Jason Buhamid',
        'Jason Downbad',
        'Amadough',
        'Harold Anderson',
        'Jason Buhamid',
        'Jason Downbad',
        'Amadough',
        'Harold Anderson',
        'Jason Buhamid',
        'Jason Downbad',
        'Amadough',
        'Harold Anderson',
       
      ];

  return (
    <div className='fsl-container'>
        <div className='fsl-title-wrapper'>
            <h1>Students</h1>
            <p>View</p>
        </div>
        <div className='fsl-students-wrapper'>
                {studentNames.map((student, index) => (
                     <div className='fsl-students-settings'>
                        <h1 key={index}>{student}</h1>
                        <IoRemoveCircle />
                    </div>
                ))}
        </div>
        
    </div>
    
    
  )
}

export default FacultyStudentsList