import React from "react";
import { Button, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { deleteQuestion, postUpsertQA } from "../../../../services/apiServices";

const ModalDeleteQuestion = (props) => {
    const { show, setShow, dataDelete, quizId, handleCancel } = props;

    const handleClose = () => {
        setShow(false);
    };

    const handleSubmitDeleteQuiz = async () => {
        let res = await deleteQuestion(+dataDelete.id, +quizId)
   
        if (res && res.EC === 0) {
            handleClose();
    
            await props.fetchQuestion();
        } else {
            toast.error(res?.EM || 'Có lỗi xảy ra!');
        }
    };

    return (
        <Modal
            className="modal-add-user"
            show={show}
            onHide={handleClose}
            size="x"
            backdrop='static'
        >
            <Modal.Header closeButton>
                <Modal.Title>Xác nhận xóa câu hỏi</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Bạn có chắc chắn muốn xóa câu hỏi:
                <b>{dataDelete?.description || ''}</b>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="outline-danger" onClick={handleSubmitDeleteQuiz}>
                    Confirm
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalDeleteQuestion;
