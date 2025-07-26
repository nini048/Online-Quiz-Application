import React, { useState } from "react"
import { Button } from "react-bootstrap"
import { Modal } from "react-bootstrap"
import { deleteUser } from "../../../services/apiServices"
import { toast } from "react-toastify"
const ModalDeleteUser = (props) => {
    const { show, setShow , dataDelete, setDataDelete} = props;
    const handleClose = () => {
        setShow(false);
    }
    const handleSubmitDeleteUser = async () => {
        let data = await deleteUser(dataDelete.id);

        if (data && data.EC === 0) {
            toast.success('successful!!');
            handleClose();
            await props.fetchListUsers();
        } else
        if (data && data.EC !== 0) {
            toast.error(data.EM);
        }
    }
    return (
        <>
            <Modal
                className="modal-add-user"
                show={show}
                onHide={handleClose}
                size="x"
                backdrop='static'
            >
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete a User?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure to delete this user email: 
                    <b>
                        {dataDelete && dataDelete.email ? dataDelete.email : ''}
                    </b>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick= {() => {handleSubmitDeleteUser()}}>
                        Confirm
                    </Button>
                    {/* <Button variant="primary" onClick={() => {handleSubmitCreateUser ()}}>
                        Save
                    </Button> */}
                </Modal.Footer>
            </Modal>
        </>

    )
}
export default ModalDeleteUser
