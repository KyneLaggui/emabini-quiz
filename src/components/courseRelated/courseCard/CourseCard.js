import './CourseCard.scss';
import { Link } from 'react-router-dom';

const CourseCard = ({courseCode, courseTitle}) => {


    return (
        <div className="course-card-container">
            <div className="course-card-cover">
                
            </div>
            <div className="course-card-detail">
                <p className="course-card-title"><Link>{courseCode}</Link></p>
                <p className="bold"><Link>{courseTitle}</Link></p>
            </div>
        </div>
    );
}
 
export default CourseCard;