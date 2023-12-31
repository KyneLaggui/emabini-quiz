import React from 'react'
import './AccountManagement.scss';
import AccountManagementHeader from '../../../components/facultyHead/AccountManagementHeader.js/AccountManagementHeader'
import PageLayout from '../../../layouts/pageLayout/PageLayout';
import AccountManagementTable from '../../../components/facultyHead/AccountManagementTable/AccountManagementTable';
import FacultyHeadOnly from '../../../layouts/facultyHeadOnly/FacultyHeadOnly';
import Sidebar from '../../../components/Sidebar/Sidebar';

const AccountManagement = () => {
  return (
    <>
      <Sidebar></Sidebar>
      <PageLayout>
        <FacultyHeadOnly>
          <div className="account-management-container">            
                <AccountManagementHeader />
                <AccountManagementTable />
            </div>
        </FacultyHeadOnly>        
      </PageLayout>
    </>    
  )
}

export default AccountManagement