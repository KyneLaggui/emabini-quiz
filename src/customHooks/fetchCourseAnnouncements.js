import React, { useEffect, useState } from 'react'
import { supabase } from '../supabase/config';

const FetchCourseAnnouncement = (code, dataChange) => {
    const [announcementsData, setAnnouncementsData] = useState([]);

    useEffect(() => {
        const getAnnouncements = async() => {
            if (code) {
                let courseAnnouncements = await supabase.from("course_announcement")
                .select()
                .eq('course_code', code)
                
                setAnnouncementsData(courseAnnouncements['data']);
            }            
            
        }

        getAnnouncements();
    }, [code, dataChange])

    return {announcementsData}
}

export default FetchCourseAnnouncement