import React, { useState } from "react"
import { Button } from "react-bootstrap"
import { Modal } from "react-bootstrap"

import { toast } from "react-toastify"
import { deleteQuiz } from "../../../../services/apiServices"
const ModalDeleteQuiz = (props) => {
    const { show, setShow , dataDelete, setDataDelete} = props;
    const handleClose = () => {
        setShow(false);
    }
    const handleSubmitDeleteQuiz = async () => {
        let data = await deleteQuiz(dataDelete.id);


        if (data && data.EC === 0) {
            toast.success('successful!!');
            handleClose();
             await props.fetchQuiz();
            // await props.fetchListUsersWithPaginate(props.currentPage);
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
                    <Modal.Title>Confirm Delete a Quiz</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure to delete this quiz:  
                    <b>
                        {dataDelete && dataDelete.name ? dataDelete.name : ''}
                    </b>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="outline-danger" onClick= {() => {handleSubmitDeleteQuiz()}}>
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
export default ModalDeleteQuiz
