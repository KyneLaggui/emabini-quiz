import React, { useEffect, useState } from 'react'
import { supabase } from '../supabase/config';

const FetchStudentsEmail = () => {
    const [emails, setEmails] = useState(null);
    const [isLoadingProfile, setIsLoadingProfile] = useState(false);  

    useEffect(() => {
        setIsLoadingProfile(true)
        const getProfile = async() => {            
            let students = await supabase.from("profiles")
            .select("email")
            .eq('role', 'student')

            const emailData = []

            for (let i = 0; i < students.data.length; i++) {
                emailData.push(students.data[i]['email'])
            }
                  
            setEmails(emailData)
            setIsLoadingProfile(false)
        }

        getProfile();
    }, [])

    return {emails}
}

export default FetchStudentsEmail