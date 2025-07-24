
import { useState } from 'react';
import ModalCreateUser from './ModalCreateUser';
import { FaCirclePlus } from "react-icons/fa6";
import './ManageUser.scss'
const ManagerUser = (props) => {
    const [showModalCreateUser, setShowModalCreateUser] = useState(false);
    return (
        <div className="manage-user-container">
            <div className="title">
                Manage User
            </div>
            <div className="user-content">
                <div className="btn-add-new">
                    <button
                        className='btn btn-light'
                        onClick = {()=>setShowModalCreateUser(true)}
                    >
                        <FaCirclePlus/>
                        Add new user
                    </button>
                </div>
                
            </div>
            <div className='table-user-container'>
                table users
               
            </div>
            <ModalCreateUser
                show={showModalCreateUser}
                setShow={setShowModalCreateUser}
            />
        </div>
        
    )
}

export default ManagerUser