const Calendar = () => {
    return (
        <>
            <div className="calendar-wrapper">
                <p className="current-date">November 2023</p>
                <div className="icons">
                    <span className="material-symbols-rounded"></span>
                    <span className="material-symbols-rounded"></span>
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
                    <li>Sun</li>
                    <li>Mon</li>
                    <li>Tue</li>
                    <li>Wed</li>
                    <li>Thu</li>
                    <li>Fri</li>
                    <li>Sat</li>
                </ul>
            </div>
        </>
    );
}
 
export default Calendar;