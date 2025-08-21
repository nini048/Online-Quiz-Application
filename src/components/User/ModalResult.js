import React, { useState } from "react"
import { Button } from "react-bootstrap"
import { Modal } from "react-bootstrap"



const ModalResult = (props) => {
    const { show, setShow, dataModalResult } = props;
    const handleClose = () => {
        setShow(false);
    }
   
    return (
        <>
            <Modal
                className="modal-result"
                show={show}
                onHide={handleClose}
                size="x"
                backdrop='static'
            >
                <Modal.Header closeButton>
                    <Modal.Title>Your result...</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>Total Questions: <b>{dataModalResult.countTotal}</b></div>
                    <div>Total Correct Answer: <b>{dataModalResult.countCorrect}</b></div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="light" onClick={handleClose}>
                        Show answers
                    </Button>
                    <Button variant="secondary" onClick= {handleClose}>
                        Close
                    </Button>
                    {/* <Button variant="primary" onClick={() => {handleSubmitCreateUser ()}}>
                        Save
                    </Button> */}
                </Modal.Footer>
            </Modal>
        </>

    )
}
export default ModalResult
