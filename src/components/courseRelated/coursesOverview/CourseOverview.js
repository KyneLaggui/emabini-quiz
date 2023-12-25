import './CourseOverview.scss';
import CourseCarousel from '../courseCarousel/CourseCarousel';
import CourseCard from '../courseCard/CourseCard';

const CourseOverview = () => {
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