import './Calendar.scss';
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";
import { useState, useEffect } from 'react';
import { layouts } from 'chart.js';

const Calendar = () => {
    let [date, setDate] = useState(new Date());
    
    let [currYear, setCurrYear] = useState(date.getFullYear());
    let [currMonth, setCurrMonth] = useState(date.getMonth());
   
    let firstDayOfMonth = new Date(currYear, currMonth, 1).getDay();
    let lastDateOfMonth = new Date(currYear, currMonth + 1, 0).getDate();
    let lastDayOfMonth = new Date(currYear, currMonth, lastDateOfMonth).getDay();
    let lastDateOfLastMonth = new Date(currYear, currMonth, 0).getDate();

    const months = [
        "January", "February", "March", "April", "May", "June", "July",
        "August", "September", "October", "November", "December"
    ]

    // Getting days of the current month
    const currentDaysArray =  Array.from ({ length: lastDateOfMonth }, (_, index) => index + 1) 
    // Getting days of previous months
    const previousDaysArray =  Array.from ({ length: firstDayOfMonth }, (_, index) => lastDateOfLastMonth - (firstDayOfMonth-index) + 1)
    // Getting days of next month
    const nextDaysArray =  Array.from ({ length: 6 - lastDayOfMonth}, (_, index) => (lastDayOfMonth + index) - lastDayOfMonth + 1)

    const goNext = () => {
        setCurrMonth(currMonth + 1)
    }

    const goPrevious = ()=> {
        setCurrMonth(currMonth - 1)
    }

    console.log(currMonth)
    useEffect(() => {   
        if (currMonth > 11 || currMonth < 0) {
            const newDate = new Date(currYear, currMonth)
            setDate(newDate); // Update the date with the next year calendar
            setCurrYear(newDate.getFullYear()) 
            setCurrMonth(newDate.getMonth());
        } 
    }, [currMonth, currYear, date])

    return (
        <>
            <div className="calendar-wrapper">
                <div className="calendar-header">
                    <p className="current-date">{months[currMonth]} {currYear}</p>
                    <div className="icons">
                        <FaChevronCircleLeft className="arrow" onClick={() => goPrevious()}/>
                        <FaChevronCircleRight className="arrow" onClick={() => goNext()} />
                    </div>
                </div>                        
                <div className="calendar">
                    <ul className="weeks">
                        <li>Sun</li>
                        <li>Mon</li>
                        <li>Tue</li>
                        <li>Wed</li>
                        <li>Thu</li>
                        <li>Fri</li>
                        <li>Sat</li>
                    </ul>
                    <ul className="days">
                        {
                            previousDaysArray.map((number, i) => {
                                return (
                                    <li className="inactive" key={i}>{number}</li>
                                )
                            })    
                        }
                        {   
                            currentDaysArray.map((number, i) => {
                                // Highlight current day
                                let isToday = number === new Date().getDate() 
                                    && currMonth === new Date().getMonth() 
                                    && currYear === new Date().getFullYear() ? "active" : "";       

                                    return (
                                    <li key={i} className={`${isToday}`}>{number}</li>
                                )
                            })
                        }
                        {   
                            nextDaysArray.map((number, i) => {
                                return (
                                    <li className="inactive" key={i}>{number}</li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        </>
    );
}
 
export default Calendar;
