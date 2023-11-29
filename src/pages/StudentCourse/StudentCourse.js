import './StudentCourse.scss';
import React from 'react'
import PageLayout from '../../layouts/pageLayout/PageLayout';
import CourseCard from '../../components/courseRelated/courseCard/CourseCard'
import Sidebar from '../../components/Sidebar/Sidebar';



const StudentCourse = () => {
    const courses = [
        {
            courseCode: 'CMPE 10113',
            courseTitle: 'Operating Systems'
        },
        {
            courseCode: 'CMPE 40062',
            courseTitle: 'Web Development'
        },
        {
            courseCode: 'CMPE 30113',
            courseTitle: 'Software Design'
        },
        {
            courseCode: 'CMPE 30043',
            courseTitle: 'Discrete Mathematics'
        },
        {
            courseCode: 'MATH 20053',
            courseTitle: 'Calculus 2'
        },
        {
            courseCode: 'PHED 10022',
            courseTitle: 'Rhythmic Activities'
        },
    
    ]
    
  return (
    <>
        <Sidebar></Sidebar>
        <PageLayout>
        
            <div className='courses-orie'>
                {courses.length === 0 ? (
                    <p>No courses found.</p>
                    ) : (
                        
                        courses.map((course, i) => {
                            return (
                                <CourseCard {...course} key={i}/>
                                
                            )
                        })
                    )
                
                }
            </div>

            
        </PageLayout>
    </>
  )
}

export default StudentCourse