import React from 'react'
import './AccountManagement.scss';
import AccountManagementHeader from '../../../components/facultyHead/AccountManagementHeader.js/AccountManagementHeader'
import PageLayout from '../../../layouts/pageLayout/PageLayout';
import AccountManagementTable from '../../../components/facultyHead/AccountManagementTable/AccountManagementTable';

const AccountManagement = () => {
  return (
    <PageLayout>
        <div className="account-management-container">            
            <AccountManagementHeader />
            <AccountManagementTable />
        </div>
    </PageLayout>
    
  )
}

export default AccountManagement