import React, { useEffect, useState } from 'react'
import { supabase } from '../supabase/config';

const FetchUserProfile = (id) => {
    
    const [user, setUser] = useState(null)

    useEffect(() => {
        const getProfile = async() => {
            if (id) {
                let userData = await supabase.from("profiles")
                .select("*")
                .eq('id', id)
                .single();                   
                setUser(userData['data']);
            }            
        }

        getProfile();
    }, [id])

    return user
}

export default FetchUserProfile