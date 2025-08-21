

import ModalCreateUser from './ModalCreateUser';
import { FaCirclePlus } from "react-icons/fa6";
import { useEffect, useState } from "react"
import { getAllUsers, getUserWithPaginate } from "../../../services/apiServices";
import './ManageUser.scss'
import TableUser from './TableUser';
import ModalUpdateUser from './ModalUpdateUser';
import ModalViewUser from './ModalViewUser';
import ModalDeleteUser from './ModalDeleteUser';
import TableUserPaginate from './TableUserPaginate';
const ManagerUser = (props) => {
    const LIMIT_USER = 10;
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [showModalCreateUser, setShowModalCreateUser] = useState(false);
    const [listUsers, setListUsers] = useState([]);
    const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
    const [showModalViewUser, setShowModalViewUser] = useState(false);
    const [showModalDeleteUser, setShowModalDeleteUser] = useState(false);
    const [dataUpdate, setDataUpdate] = useState({});
    const [dataDelete, setDataDelete] = useState({});

    useEffect(() => {
        fetchListUserWithPaginate(1);
    }, []);

    const fetchListUser = async () => {
        let res = await getAllUsers();
        if (res.EC === 0) {
            setListUsers(res.DT);
        }

    }
    const fetchListUserWithPaginate = async (page) => {
        let res = await getUserWithPaginate(page, LIMIT_USER);
        if (res.EC === 0) {

            setListUsers(res.DT.users);
            setPageCount(res.DT.totalPages);
            setCurrentPage(page);
        }
    }
    const handleClickBtnUpdate = (user) => {
        setShowModalUpdateUser(true);
        setDataUpdate(user);
    }
    const handleClickBtnView = (user) => {
        setShowModalViewUser(true);
        setDataUpdate(user);
    }
    const handleClickBtnDelete = (user) => {
        setShowModalDeleteUser(true);
        setDataDelete(user);
    }
    return (
        <div className="manage-user-container">
            {/* <div className="title">
                Manage User
            </div> */}
            <div className="user-content">
                <div className="btn-add-new">
                    <button
                        className='btn btn-light'
                        onClick={() => setShowModalCreateUser(true)}
                    >
                        <FaCirclePlus style={{ marginRight: '8px' }} />
                        Add new user
                    </button>
                </div>

            </div>
            <div className='table-user-container'>
                <TableUserPaginate
                    listUsers={listUsers}
                    handleClickBtnUpdate={handleClickBtnUpdate}
                    handleClickBtnView={handleClickBtnView}
                    handleClickBtnDelete={handleClickBtnDelete}
                    fetchListUserWithPaginate={fetchListUserWithPaginate}
                    pageCount={pageCount}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />

            </div>
            <ModalCreateUser
                show={showModalCreateUser}
                setShow={setShowModalCreateUser}
                fetchListUsersWithPaginate={fetchListUserWithPaginate}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}

            />
            <ModalUpdateUser
                show={showModalUpdateUser}
                setShow={setShowModalUpdateUser}
                fetchListUsersWithPaginate={fetchListUserWithPaginate}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}

            />
            <ModalViewUser
                show={showModalViewUser}
                setShow={setShowModalViewUser}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
            />
            <ModalDeleteUser
                show={showModalDeleteUser}
                setShow={setShowModalDeleteUser}
                dataDelete={dataDelete}
                setDataDelete={setDataDelete}
                fetchListUsersWithPaginate={fetchListUserWithPaginate}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}

            />
        </div>

    )
}

export default ManagerUser