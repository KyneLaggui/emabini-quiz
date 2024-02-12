import { useEffect, useState } from 'react';
import './CourseCard.scss';
import { Link } from 'react-router-dom';

const CourseCard = ({code, name, id}) => {    
  
    return (
        <Link to={`/student-courses/${id}`}>
            <div className="course-card-container">
                <div className="course-card-cover">
                    
                </div>
                <div className="course-card-detail">
                    <p className="course-card-title">{code}</p>
                    <p className="bold">{name}</p>
                </div>
            </div>
        </Link>
        
    );
}
 
export default CourseCard;