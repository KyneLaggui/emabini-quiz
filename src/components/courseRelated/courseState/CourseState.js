import { FaAngleRight } from "react-icons/fa";
import "./CourseState.scss"
import { Link } from 'react-router-dom';


const CourseState = ({quizTitle, quizDate, quizTime, quizState, quizWeek}) => {
    let csExamStateClass = '';

    if (quizState === 'Done') {
        csExamStateClass = 'done'; 
    } else if (quizState === 'Take Now') {
        csExamStateClass = 'tn'; 
    } else if (quizState === 'Not Available') {
        csExamStateClass = 'na'; 
    }
    

    return (
        <div className="cs-week-cont">
            <h1><Link>Week {quizWeek}</Link></h1>
            <div className="cs-container">
                
                <div className="cs-left">
                    <h1><Link>{quizTitle}</Link></h1>
                    <p><Link>{quizDate}</Link></p>
                    <p><Link>{quizTime}</Link></p>
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