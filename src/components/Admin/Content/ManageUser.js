
import { useState } from 'react';
import ModalCreateUser from './ModalCreateUser';
import './ManageUser.scss'
const ManagerUser = (props) => {
    return (
        <div className="manager-user-container">
            <div className="title">
                Manage User
            </div>
            <div className="user-content">
                <button>Add new user</button>
            </div>
            <div>
                table users
               
            </div>
             <ModalCreateUser />
        </div>
        
    )
}

export default ManagerUser