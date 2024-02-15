import { useState, useEffect } from 'react';
import { FaBell } from "react-icons/fa";
import { supabase } from '../../supabase/config';
import "./Announcements.scss"
import { useSelector } from 'react-redux';
import { selectUserID } from '../../redux/slice/authSlice';

const Announcements = () => {
    const [announcements, setAnnouncements] = useState([]);
    const [loggedInInstructorId, setLoggedInInstructorId] = useState(null); // Assuming you have a way to get the logged-in instructor ID

    const fetchedUserId = useSelector(selectUserID)
    
    useEffect(() => {
        const fetchAnnouncements = async () => {
            try {
                // Fetch the logged-in instructor ID
                const loggedInInstructorId = 'YOUR_LOGGED_IN_INSTRUCTOR_ID'; // Replace with your actual implementation to get the logged-in instructor ID

                // Fetch announcements from the course_announcement table
                const { data: allAnnouncements, error: announcementError } = await supabase
                    .from('course_announcement')
                    .select('content, course_code')
                    .order('created_at', { ascending: false });

                console.log(allAnnouncements)

                if (announcementError) {
                    throw new Error('Error fetching announcements:', announcementError.message);
                }

                setAnnouncements(allAnnouncements)

                // Fetch courses for the logged-in instructor
                const { data: courses, error: courseError } = await supabase
                    .from('course')
                    .select('code, instructor_id')
                    .eq('instructor_id', loggedInInstructorId);

        

                if (courseError) {
                    throw new Error('Error fetching courses:', courseError.message);
                }

                // console.log('Fetched courses:', courses);

                // Filter announcements based on course codes associated with the logged-in instructor
                // const filteredAnnouncements = allAnnouncements.filter(announcement => {
                //     return courses.some(course => course.course_code === announcement.course_code);
                // });

                // console.log('Filtered announcements:', filteredAnnouncements);

                // setAnnouncements(filteredAnnouncements);
            } catch (error) {
                console.error(error.message);
            }
        };

        fetchAnnouncements();
    }, []);

    const today = new Date();

    const formattedDate = today.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      });

    return (
        <>
            <div className="announcements-container">
                <div className="top-announcement">
                    <div>
                        <p className="eb-semi-titles blue">Announcements</p>
                        <p className="eb-standard red">{formattedDate}</p>
                    </div>
                    {/* <div className="notif-bell-container">
                        <FaBell className="notif-icon"/>
                    </div> */}
                </div>
                <div className="announcements-preview">
                    {announcements.map((announcement, index) => (
                        <div key={index} className="announcement-preview-row">
                            <p className='apr-code'>{announcement.course_code}</p>
                            <p className='eb-standard'>{announcement.content}</p>
                            
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Announcements;
