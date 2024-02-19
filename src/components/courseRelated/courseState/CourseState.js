import { FaAngleRight } from "react-icons/fa";
import "./CourseState.scss"
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { supabase } from "../../../supabase/config";

const CourseState = ({ title, created_at, duration, quizState, taken }) => {
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
                    {
                        duration ? (
                            <p><Link>Duration: {`${duration} ${duration > 1 ? 'minutes' : 'minute'}`}</Link></p>
                        ) : (
                            <p><Link>Type: Video Quiz</Link></p>
                        )
                    }
                    
                </div>

                <div className="cs-right">
                    <div className={`cs-exam-state ${csExamStateClass}`}>
                        <h1><Link>{quizState}</Link></h1>
                    </div>
                        <div className={`changing-text ${taken ? 'completed' : 'incomplete'}`}>
                        {taken ? 'Completed' : 'Take now'}
                    </div>
                    <FaAngleRight />

                </div>

                {/* Text with changing background and text based on boolean value */}
               

            </div>
        </div>

    )
}

export default CourseState
