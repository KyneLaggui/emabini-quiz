import React from 'react'
import "./CourseFacultyOverview.scss"
import CourseCarousel from '../courseCarousel/CourseCarousel'
import CourseFacultyCard from '../courseFacultyCard/CourseFacultyCard'

const CourseFacultyOverview = () => {

    const coursesFaculty = [
        {
            courseCode: 'CMPE 10113',
            courseTitle: 'Operating Systems',
            courseStudents: "24"
        },
        {
            courseCode: 'CMPE 40062',
            courseTitle: 'Web Development',
            courseStudents: "25"
        },
        {
            courseCode: 'CMPE 30113',
            courseTitle: 'Software Design',
            courseStudents: "26"
        },
        {
            courseCode: 'CMPE 30043',
            courseTitle: 'Discrete Mathematics',
            courseStudents: "24"
        },
        {
            courseCode: 'MATH 20053',
            courseTitle: 'Calculus 2',
            courseStudents: "27"
        },
        {
            courseCode: 'PHED 10022',
            courseTitle: 'Rhythmic Activities',
            courseStudents: "28"
        }, 

]
  return (
        <div className="course-overview-wrapper">
            <p className="bold medium-text">Courses Overview</p>
            {coursesFaculty.length === 0 ? (
                <p>No courses found.</p>
            ) : (
                <CourseCarousel>
                    {coursesFaculty.map((course, i) => {
                        return (
                            <CourseFacultyCard {...course} key={i}/>
                        )
                    })}
                </CourseCarousel>
            )
        
        }
            
        </div>
  )
}

export default CourseFacultyOverview