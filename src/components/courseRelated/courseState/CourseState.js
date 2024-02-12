import { FaAngleRight } from "react-icons/fa";
import "./CourseState.scss"
import { Link } from 'react-router-dom';


const CourseState = ({title, created_at, duration, quizState}) => {
    let csExamStateClass = '';

    if (quizState === 'Done') {
        csExamStateClass = 'done'; 
    } else if (quizState === 'Take Now') {
        csExamStateClass = 'tn'; 
    } else if (quizState === 'Not Available') {
        csExamStateClass = 'na'; 
    }
    
    const extractDate = (timestampz) => {
        // Parse the timestampz string to create a Date object
        const dateObject = new Date(timestampz);

        // Extract the date components
        const year = dateObject.getUTCFullYear();
        const month = dateObject.getUTCMonth() + 1; // Note: Month is zero-indexed, so we add 1
        const day = dateObject.getUTCDate();

        // Create a formatted date string
        const formattedDate = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
        return formattedDate;
    }

    const extractTime = (timestampz) => {
        // Parse the timestampz string to create a Date object
        const dateObject = new Date(timestampz);

        // Extract the time components
        let hours = dateObject.getHours();
        const minutes = dateObject.getMinutes();

        // Determine AM/PM indication
        const ampm = hours >= 12 ? 'PM' : 'AM';

        // Convert hours to 12-hour format
        hours %= 12;
        hours = hours || 12; // If hours is 0, set it to 12

        // Create a formatted time string
        const formattedTime = `${hours}:${minutes < 10 ? '0' : ''}${minutes} ${ampm}`;

       return formattedTime
    }

    return (
        <div className="cs-topic-cont">
            
            <div className="cs-container">
                
                <div className="cs-left">
                    <h1><Link>{title}</Link></h1>
                    <p><Link>Posted at: {extractDate(created_at)} {extractTime(created_at)}</Link></p>
                    <p><Link>Duration: {duration} minutes</Link></p>
                </div>

                <div className="cs-right">
                    <div className={`cs-exam-state ${csExamStateClass}`}>
                        <h1><Link>{quizState}</Link></h1>
                    </div>
                    <FaAngleRight/>

                </div>
            </div>
        </div>
        
    )
}

export default CourseState