import React, { useEffect, useState } from 'react'
import './AccountManagement.scss';
import AccountManagementHeader from '../../../components/facultyHead/AccountManagementHeader.js/AccountManagementHeader'
import PageLayout from '../../../layouts/pageLayout/PageLayout';
import AccountManagementTable from '../../../components/facultyHead/AccountManagementTable/AccountManagementTable';
import FacultyHeadOnly from '../../../layouts/facultyHeadOnly/FacultyHeadOnly';
import Sidebar from '../../../components/Sidebar/Sidebar';
import FetchAllUserProfile from '../../../customHooks/fetchAllUserProfiles';

const AccountManagement = () => {
  const [users, setUsers] = useState([])
  const [dataChange, setDataChange] = useState(false)

  const { profiles } = FetchAllUserProfile(dataChange)

  const alterData = () => {
    setDataChange(!dataChange)
  }

  useEffect(() => {
    if (profiles) {
      setUsers(profiles)
    }
  }, [profiles])

  return (
    <>
      <Sidebar></Sidebar>
      <PageLayout>
        <FacultyHeadOnly>
          <div className="account-management-container">            
                <AccountManagementHeader/>
                <AccountManagementTable users={users} changeData={alterData}/>
            </div>
        </FacultyHeadOnly>        
      </PageLayout>
    </>    
  )
}

export default AccountManagement