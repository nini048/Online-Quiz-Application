import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FaCirclePlus } from "react-icons/fa6";
import { ToastContainer, toast } from 'react-toastify';
import { putUpdateUser } from "../../../services/apiServices";
import _ from 'lodash';
import './ManageUser.scss'
import { useDispatch, useSelector } from 'react-redux';
import { doUpdate } from '../../../redux/action/userAction';
import { store } from '../../../redux/store';
const ModalUpdateUser = (props) => {
    const { show, setShow, dataUpdate, setDataUpdate } = props;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [role, setRole] = useState('USER');
    const [image, setImage] = useState('');
    const [previewImage, setPreviewImage] = useState('');
    const dispatch = useDispatch();
    // const account = useSelector(state => state.user.account);



    useEffect(() => {
        if (!_.isEmpty(dataUpdate)) {
            setEmail(dataUpdate.email);
            setUsername(dataUpdate.username);
            setRole(dataUpdate.role);
            setImage(dataUpdate.image);
            console.log('image old: ', image);

            if (dataUpdate.image) {
                setPreviewImage(`data:image/jpeg;base64,${dataUpdate.image}`)
            }
            else {
                setPreviewImage('')
            }


        }
    }, [dataUpdate]);
    const handleUploadImage = (event) => {
        if (event.target.files && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]));
            setImage(event.target.files[0]);
        }
        else {
            // setPreviewImage('');
        }

    }
    const handleClose = () => {
        setShow(false);
        setEmail('');
        setPassword('');
        setUsername('');
        setRole('USER');
        setImage('');
        setDataUpdate({});
        setPreviewImage('');


    };


    const handleSubmitUpdateUser = async () => {
        let data = await putUpdateUser(dataUpdate.id, username, role, image)
        console.log('data: ', data);


        if (data && data.EC === 0) {
            //  const currentAccount = store.getState().account;
            //  console.log('currentAccount: ', currentAccount);

            // dispatch(doUpdate({
            //     ...data.DT,
            //     image:image
            // }));
            toast.success('successful!!');
            handleClose();
            await props.fetchListUsersWithPaginate(props.currentPage);
        } else
            if (data && data.EC !== 0) {
                toast.error(data.EM);
            }

    }


    return (
        <>
            {/* <Button variant="primary" onClick={handleShow}>
                Launch demo modal
            </Button> */}

            <Modal
                className="modal-add-user"
                show={show}
                onHide={handleClose}
                size="x"
                backdrop='static'
            >
                <Modal.Header closeButton>
                    <Modal.Title>Update user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                value={email}
                                disabled
                                onChange={(event) => setEmail(event.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                value={password}
                                disabled
                                onChange={(event) => setPassword(event.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">User name</label>
                            <input
                                type="text"
                                className="form-control"
                                value={username}
                                onChange={(event) => setUsername(event.target.value)}
                            />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Role</label>
                            <select
                                className="form-select"
                                onChange={(event) => setRole(event.target.value)}
                                value={role}
                            >
                                <option value='USER'>USER</option>
                                <option value='ADMIN'>ADMIN</option>
                            </select>
                        </div>
                        <div className="col-md-12">
                            <label className='form-label label-upload' htmlFor="labelUpload">
                                <FaCirclePlus /> Upload file image
                            </label>

                            <input
                                type="file"
                                hidden
                                id='labelUpload'
                                onChange={(event) => { handleUploadImage(event) }}
                            />
                        </div>
                        <div className="col-md-12 img-preview">
                            {previewImage ?
                                <img src={previewImage} />
                                :
                                <span>Preview image</span>}



                        </div>

                    </form>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => { handleSubmitUpdateUser() }}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalUpdateUser
