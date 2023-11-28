import './ProfileDetailsHeader.scss';
import userIcon from '../../assets/user_icon.png';

const ProfileDetailsHeader = () => {
    return (
        <>
            <div className="profile-details-container">
                <img src={userIcon} alt="User Icon" className="user-icon"/>
                <div>
                    <p className="username bold">Amado Nino Rei Punzalan</p>
                    <p className="user-id bold">2021-05787-MN-0</p>
                </div>
            </div>
        </>
    );
}
 
export default ProfileDetailsHeader;