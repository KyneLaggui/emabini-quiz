import { useEffect, useState } from 'react';
import './CourseCard.scss';
import { Link } from 'react-router-dom';

const CourseCard = ({code, name}) => {    
  
    return (
        <div className="course-card-container">
            <div className="course-card-cover">
                
            </div>
            <div className="course-card-detail">
                <p className="course-card-title"><Link>{code}</Link></p>
                <p className="bold"><Link>{name}</Link></p>
            </div>
        </div>
    );
}
 
export default CourseCard;