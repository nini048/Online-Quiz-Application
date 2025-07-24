
import { useState } from 'react';
import ModalCreateUser from './ModalCreateUser';

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
                <ModalCreateUser />
            </div>
        </div>
    )
}

export default ManagerUser