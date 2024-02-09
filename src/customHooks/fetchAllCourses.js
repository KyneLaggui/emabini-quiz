import React, { useEffect, useState } from 'react'
import { supabase } from '../supabase/config';

const FetchAllCourses = () => {
    const [coursesData, setCoursesData] = useState([])

    useEffect(() => {
        const fetchCourses = async() => {
            const {data} = await supabase
            .from('course')
            .select()

            console.log(data)
            if (data) {
                setCoursesData(data)
            }
        }   

        fetchCourses();
      }, [])

    return {coursesData}
}

export default FetchAllCourses