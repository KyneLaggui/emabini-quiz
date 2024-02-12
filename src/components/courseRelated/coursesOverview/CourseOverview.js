import './CourseOverview.scss';
import CourseCarousel from '../courseCarousel/CourseCarousel';
import CourseCard from '../courseCard/CourseCard';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectEmail, selectUserID } from '../../../redux/slice/authSlice';
import { supabase } from '../../../supabase/config';
import FetchCoursesStudent from '../../../customHooks/fetchCoursesStudent';
import { useNavigate } from 'react-router-dom';

const CourseOverview = () => {
    const [courses, setCourses] = useState([])

    const id = useSelector(selectUserID)
    const email = useSelector(selectEmail);

    const {coursesData} = FetchCoursesStudent(id, email)

      useEffect(() => {
        setCourses(coursesData)
      }, [coursesData])

    return (
        <div className="course-overview-wrapper">
            <p className="bold medium-text">Courses Overview</p>
            {courses.length === 0 ? (
                <p>No courses found.</p>
            ) : (
                <CourseCarousel>
                    {courses.map((course, i) => {
                        return (
                            <CourseCard {...course} key={i}/>
                        )
                    })}
                </CourseCarousel>
            )
        
        }
            
        </div>
    );
}
 
export default CourseOverview;