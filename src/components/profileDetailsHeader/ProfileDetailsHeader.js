import './ProfileDetailsHeader.scss';
import userIcon from '../../assets/user_icon.png';
import { useSelector } from 'react-redux';
import { selectEmail, selectUserID } from '../../redux/slice/authSlice';
import FetchUserProfile from '../../customHooks/fetchUserProfile';
import { useEffect, useState } from 'react';

const ProfileDetailsHeader = () => {
    const [userInformation, setUserInformation] = useState({
        firstName: '',
        middleName: '',
        lastName: '',
        email: ''
    })

    const id = useSelector(selectUserID)
    const email = useSelector(selectEmail)
    const {userData} = FetchUserProfile(id)

    useEffect(() => {        
        if (userData && email) {
            setUserInformation({
                firstName: userData.first_name,
                middleName: userData.middle_name,
                lastName: userData.last_name,
                email : email,
                
            })
        }        
    }, [userData])

    return (
        <>
            <div className="profile-details-container">
                <div>
                    <p className="eb-titles">{`${userInformation.firstName} ${userInformation.middleName} ${userInformation.lastName}`}</p>
                    <p className="eb-standard red">{userInformation.email}</p>
                </div>
            </div>
        </>
    );
}
 
export default ProfileDetailsHeader;