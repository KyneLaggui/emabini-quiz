import React from 'react'
import './AccountManagementTable.scss';

const AccountManagementTable = () => {

  return (
    <div className="account-management-table">
        <table>
            <thead>
                <tr>
                    <th></th>
                    <th>Full Name</th>
                    <th>Account ID</th>
                    <th>Email</th>
                    <th>Status</th>
                </tr>                
            </thead>

        </table>
    </div>
  )
}

export default AccountManagementTable