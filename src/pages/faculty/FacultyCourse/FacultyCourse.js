import React from 'react'
import Sidebar from '../../../components/Sidebar/Sidebar'
import PageLayout from '../../../layouts/pageLayout/PageLayout'
import "./FacultyCourse.scss"
import CourseFacultyCard from '../../../components/courseRelated/courseFacultyCard/CourseFacultyCard'
import SearchBar from '../../../components/filters/SearchBar'
import Sort from '../../../components/filters/Sort/Sort'

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
    
  return (
    <>
        <Sidebar></Sidebar>
        <PageLayout>
            <div className='courses-filters-container'>
                <div className='courses-filters-left'>
                    <p>Create Course</p>
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
        </PageLayout>
    </>
  )
}

export default FacultyCourse