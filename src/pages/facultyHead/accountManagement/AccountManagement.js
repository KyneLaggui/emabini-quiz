import React from 'react'
import './AccountManagement.scss';
import AccountManagementHeader from '../../../components/facultyHead/AccountManagementHeader.js/AccountManagementHeader'
import PageLayout from '../../../layouts/pageLayout/PageLayout';
import AccountManagementTable from '../../../components/facultyHead/AccountManagementTable/AccountManagementTable';
import FacultyHeadOnly from '../../../layouts/facultyHeadOnly/FacultyHeadOnly';

const AccountManagement = () => {
  return (
    <PageLayout>
      <FacultyHeadOnly>
        <div className="account-management-container">            
              <AccountManagementHeader />
              <AccountManagementTable />
          </div>
      </FacultyHeadOnly>        
    </PageLayout>
    
  )
}

export default AccountManagement