

import ModalCreateUser from './ModalCreateUser';
import { FaCirclePlus } from "react-icons/fa6";
import { useEffect, useState } from "react"
import { getAllUsers } from "../../../services/apiServices";
import './ManageUser.scss'
import TableUser from './TableUser';
import ModalUpdateUser from './ModalUpdateUser';
import ModalViewUser from './ModalViewUser';
const ManagerUser = (props) => {
    const [showModalCreateUser, setShowModalCreateUser] = useState(false);
    const [listUsers, setListUsers] = useState([]);
    const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
    const [showModalViewUser, setShowModalViewUser] = useState(false);
    const [dataUpdate, setDataUpdate] = useState({})
    useEffect(() => {
        fetchListUser();
    }, []);

    const fetchListUser = async() => {
        let data = await getAllUsers();
        console.log('data: ', data);
        setListUsers(data.DT);
    }
    const handleClickBtnUpdate = (user) => {
        setShowModalUpdateUser(true);
        setDataUpdate(user);
    }
    const handleClickBtnView = (user) => {
        setShowModalViewUser(true);
        setDataUpdate(user);
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
                <TableUser
                    listUsers={listUsers}
                    handleClickBtnUpdate={handleClickBtnUpdate}
                    handleClickBtnView = {handleClickBtnView}
                />    
               
            </div>
            <ModalCreateUser
                show={showModalCreateUser}
                setShow={setShowModalCreateUser}
                fetchListUsers={fetchListUser}
                
            />
            <ModalUpdateUser
                show={showModalUpdateUser}
                 setShow={setShowModalUpdateUser}
                fetchListUsers={fetchListUser}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}

            />
            <ModalViewUser
                show={showModalViewUser}
                setShow={setShowModalViewUser}
                dataUpdate={dataUpdate}
                setDataUpdate = {setDataUpdate}
            />
        </div>
        
    )
}

export default ManagerUser