import { useState } from "react";

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FaCirclePlus } from "react-icons/fa6";

const ModalCreateUser = (props) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [role, setRole] = useState('');
    const [image, setImage] = useState('');
    const [previewImage, setPreviewImage] = useState('')

    const handleUploadImage = (event) => {
        if (event.target.files && event.target.files[0]) {
             setPreviewImage(URL.createObjectURL(event.target.files[0]));
        }
        else {
            setPreviewImage('');
       }
       
    }

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Launch demo modal
            </Button>

            <Modal
                className="modal-add-user"
                show={show}
                onHide={handleClose}
                size="x"
                backdrop='static'
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add new user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                value={password}
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
                            <select className="form-select" onChange={(event) => setRole(event.target.value)}>
                                <option selected value='USER'>USER</option>
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
                    <Button variant="primary" onClick={handleClose}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalCreateUser
