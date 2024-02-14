import React, { useEffect, useState } from 'react';
import './StudentProgress.scss';
import StudentProgressCard from '../../../components/studentProgressCard/StudentProgressCard';
import Sidebar from '../../../components/Sidebar/Sidebar';
import PageLayout from '../../../layouts/pageLayout/PageLayout';
import StudentOnly from '../../../layouts/studentOnly/StudentOnly';
import FetchCoursesStudent from '../../../customHooks/fetchCoursesStudent';
import { selectEmail, selectUserID } from '../../../redux/slice/authSlice';
import { useSelector } from 'react-redux';

const StudentProgress = () => {
    const [courses, setCourses] = useState([])

    const id = useSelector(selectUserID)
    const email = useSelector(selectEmail);

    const {coursesData} = FetchCoursesStudent(id, email)
    useEffect(() => {
        console.log(coursesData)
        if (coursesData) {
            setCourses(coursesData)
        }
    }, [coursesData])
    // const courses = [
    //     {
    //         courseCode: 'CMPE 10113',
    //         courseTitle: 'Operating Systems'
    //     },
    //     {
    //         courseCode: 'CMPE 40062',
    //         courseTitle: 'Web Development'
    //     },
    //     {
    //         courseCode: 'CMPE 30113',
    //         courseTitle: 'Software Design'
    //     },
    //     {
    //         courseCode: 'CMPE 30043',
    //         courseTitle: 'Discrete Mathematics'
    //     },
    //     {
    //         courseCode: 'MATH 20053',
    //         courseTitle: 'Calculus 2'
    //     },
    //     {
    //         courseCode: 'PHED 10022',
    //         courseTitle: 'Rhythmic Activities'
    //     },
    // ]
  
  return (
    <>  
        <Sidebar />
        <PageLayout>
            <StudentOnly>
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
            </StudentOnly>                       
        </PageLayout>
    </>
  )
}

export default StudentProgress