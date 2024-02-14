import './ProfileDetailsHeader.scss';
import userIcon from '../../assets/user_icon.png';
import { useSelector } from 'react-redux';
import { selectUserID } from '../../redux/slice/authSlice';
import FetchUserProfile from '../../customHooks/fetchUserProfile';
import { useEffect, useState } from 'react';

const ProfileDetailsHeader = () => {
    const [userInformation, setUserInformation] = useState({
        firstName: '',
        middleName: '',
        lastName: '',
    })

    const id = useSelector(selectUserID)

    const {userData} = FetchUserProfile(id)

    useEffect(() => {        
        if (userData) {
            setUserInformation({
                firstName: userData.first_name,
                middleName: userData.middle_name,
                lastName: userData.last_name,
            })
        }        
    }, [userData])

    return (
        <>
            <div className="profile-details-container">
                <div>
                    <p className="eb-titles">{`${userInformation.firstName} ${userInformation.middleName} ${userInformation.lastName}`}</p>
                    <p className="eb-standard red">2021-05787-MN-0</p>
                </div>
            </div>
        </>
    );
}
 
export default ProfileDetailsHeader;