import './PageLayout.scss';
import { supabase } from '../../supabase/config';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { REMOVE_ACTIVE_USER, SET_ACTIVE_USER } from '../../redux/slice/authSlice';

const PageLayout = ({children}) => {
    
    const dispatch = useDispatch();
    
    useEffect(() => {
        supabase.auth.onAuthStateChange((_event, session) => {
            if (session) {
                dispatch(
                    SET_ACTIVE_USER({
                        email: session.user.email,
                        userId: session.user.id
                    })
                );

            } else {
                dispatch(REMOVE_ACTIVE_USER());
            }
          })
    }, [dispatch])


    return (
        <div className={`page`}>
            {children}
        </div>
    );
}

export default PageLayout;