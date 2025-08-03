import React, { useState } from "react"
import { Button } from "react-bootstrap"
import { Modal } from "react-bootstrap"
import { deleteUser } from "../../../services/apiServices"
import { toast } from "react-toastify"

const ModalSubmit = (props) => {
    const { show, setShow, isSubmit, setIsSubmit, handleSubmit} = props;
    const handleClose = () => {
        setShow(false);
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
                    <Modal.Title>Confirm Submit Quiz?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure to submit this quiz
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="outline-danger" onClick={() => {handleSubmit()}}>
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
export default ModalSubmit
