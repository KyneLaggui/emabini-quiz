import React, { useEffect, useState } from 'react'
import { supabase } from '../supabase/config';

const FetchAllUserProfile = (dataChange) => {
    const [profiles, setProfiles] = useState(null);
    const [isLoadingProfile, setIsLoadingProfile] = useState(false);  

    useEffect(() => {
        setIsLoadingProfile(true)
        const getProfile = async() => {
                let userData = await supabase.from("profiles")
                .select()

            setProfiles(userData['data']);                       
            setIsLoadingProfile(false)
        }

        getProfile();
    }, [dataChange])


    return {profiles, isLoadingProfile}
}

export default FetchAllUserProfile