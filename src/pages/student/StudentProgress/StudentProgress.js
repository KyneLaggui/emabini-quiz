import React from 'react';
import './StudentProgress.scss';
import StudentProgressCard from '../../../components/studentProgressCard/StudentProgressCard';
import Sidebar from '../../../components/Sidebar/Sidebar';
import PageLayout from '../../../layouts/pageLayout/PageLayout';

const StudentProgress = () => {
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
        <Sidebar />
        <PageLayout>
            <div className="student-progress-wrapper">
                {courses.length === 0 ? (
                        <p>No courses found.</p>
                        ) : (
                            
                            courses.map((course, i) => {
                                return (
                                    <StudentProgressCard {...course} key={i}/>                            
                                )
                            })
                        )
                    
                }
            </div>            
        </PageLayout>
    </>
  )
}

export default StudentProgress