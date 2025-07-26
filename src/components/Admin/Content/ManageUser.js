

import ModalCreateUser from './ModalCreateUser';
import { FaCirclePlus } from "react-icons/fa6";
import { useEffect, useState } from "react"
import { getAllUsers } from "../../../services/apiServices";
import './ManageUser.scss'
import TableUser from './TableUser';
const ManagerUser = (props) => {
    const [showModalCreateUser, setShowModalCreateUser] = useState(false);
     const [listUsers, setListUsers] = useState([]);
    useEffect(() => {
        fetchListUser();
    }, []);

    const fetchListUser = async() => {
        let data = await getAllUsers();
        console.log('data: ', data);
        setListUsers(data.DT);
    }


   
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
                <TableUser listUsers={listUsers}/>    
               
            </div>
            <ModalCreateUser
                show={showModalCreateUser}
                setShow={setShowModalCreateUser}
                fetchListUsers = {fetchListUser}
            />
        </div>
        
    )
}

export default ManagerUser