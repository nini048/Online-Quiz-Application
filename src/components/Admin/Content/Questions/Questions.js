import React, { useEffect, useState } from 'react';
import './Questions.scss';
import { FaCirclePlus } from "react-icons/fa6";
import { useParams } from 'react-router';
import { getAllQuestionInQuiz, getAllQuiz, postNewAnswer, postNewQuestion, putUpdateQuestion, putUpdateAnswer, postQuizToUser, postUpsertQA, getQuestionByQuizId, deleteAnswer } from '../../../../services/apiServices';
import { v4 as uuidv4, v4 } from 'uuid'
import { cloneDeep } from 'lodash';
import { current } from '@reduxjs/toolkit';
import _ from 'lodash';
import { useSelector } from 'react-redux';
import ModalDeleteQuestion from './ModalDeleteQuestion';


const Questions = () => {

    const [question, setQuestion] = useState({
        description: '',
        image: '',
        answers: [
            { description: '', isCorrect: false },
            { description: '', isCorrect: false },
            { description: '', isCorrect: false },
        ]
    });
    const [isEnableSubmit, setIsEnableSubmit] = useState(false);
    const [image, setImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [isEditQuestion, setIsEditQuestion] = useState(false);
    const [currentIdQuestion, setCurrentIdQuestion] = useState('');
    // const [listQuiz, setListQuiz] = useState([])
    const [questions, setQuestions] = useState([]);
    const { quizId } = useParams('quizId')
    const userId = useSelector(state => state.user.account.id);
    const [showModalDeleteQuestion, setShowModalDeleteQuestion] = useState(false)
    const [dataDelete, setDataDelete] = useState('')
    const [currentQuestionUpdate, setCurrentQuestionUpdate] = useState('')



    useEffect(() => {
        fetchQuestion();
    }, []);

    useEffect(() => {
        enableSubmit();
    }, [question]);


    const fetchQuestion = async () => {
        let res = await getQuestionByQuizId(+quizId);
        const data = res.DT.qa

        setQuestions(
            data.map((item) => ({
                ...item,
                image: item.imageFile || null,
            })).reverse()
        );




    }



    const handleUploadImage = (event) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setPreviewImage(URL.createObjectURL(file));
            setImage(file);
            setQuestion({ ...question, image: file });
        }
    };


    const handleAnswerChange = (index, field, value) => {
        const newAnswers = [...question.answers];

        if (field === 'isCorrect') {
            newAnswers.forEach((a, i) => {
                a.isCorrect = i === index;
            });
        } else {
            newAnswers[index][field] = value;
        }

        setQuestion({ ...question, answers: newAnswers });
    };


    const handleAddAnswer = async () => {
        setQuestion({
            ...question,
            answers: [
                ...question.answers,
                {
                    description: '',
                    isCorrect: false
                }]
        });



    };

    const handleRemoveAnswer = (index) => {
        const newAnswers = question.answers.filter((_, i) => i !== index);
        setQuestion({ ...question, answers: newAnswers });
    };



    const handleSubmit = async () => {

        const newQuestion = {
            id: +quizId,
            description: question.description,
            image: question.image,
            answers: question.answers
        };
        const res = await postNewQuestion(
            +quizId,
            newQuestion.description,
            newQuestion.image,
        );

        if (res && res.EC === 0 && res.DT?.id) {
            for (const answer of newQuestion.answers) {
                await postNewAnswer(
                    answer.description,
                    answer.isCorrect,
                    res.DT.id
                )
            }
        } else {
            console.error('Failed to create question:', res);
            return;
        }



        setQuestions([newQuestion, ...questions]);
        setIsEnableSubmit(false)
        setImage(null);
        setPreviewImage(null);
        setQuestion( defaultQuestion);

    };
    const defaultQuestion = {
        description: '',
        image: '',
        answers: [
            { description: '', isCorrect: false },
            { description: '', isCorrect: false },
            { description: '', isCorrect: false },
        ]
    };
    const enableSubmit = () => {
        const hasDescription = question.description.trim() !== '';
        const hasAnswers = question.answers.length > 1;
        const hasCorrectAnswer = question.answers.some(ans => ans.isCorrect);
        const allAnswersFilled = question.answers.every(ans => ans.description.trim() !== '');
        setIsEnableSubmit(hasDescription && hasAnswers && hasCorrectAnswer && allAnswersFilled);
    };
    const handleDeleteQuestion = (q) => {
        setDataDelete(q)
      
        setShowModalDeleteQuestion(true);
    
    }
    const handleEditQuestion = (q) => {
        setIsEditQuestion(true);
        let previewImgSrc = null;
        setImage(q.image);
        if (q.image) {
            if (q.image instanceof File) {
                previewImgSrc = URL.createObjectURL(q.image);
            } else if (typeof q.image === 'string' && q.image.startsWith('data:')) {
                previewImgSrc = q.image;
            } else {
                previewImgSrc = `data:image/jpeg;base64,${q.image}`;
            }
        }


        setPreviewImage(previewImgSrc);
        setQuestion(cloneDeep(q));
        setCurrentIdQuestion(q.id)
        setCurrentQuestionUpdate(q);

    }
    const handleCancel = () => {
        setIsEditQuestion(false);
        setImage(null);
        setPreviewImage(null);
        setQuestion( defaultQuestion);

    }

    const toBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };


    const handleUpdateQuestion = async () => {
        const questionsClone = _.cloneDeep(questions);

        await Promise.all(questionsClone.map(async (q) => {
            if (q.image instanceof File) {
                q.imageFile = await toBase64(q.image);
            } else if (typeof q.image === 'string' && q.image.startsWith('data:')) {
                q.imageFile = q.image;
            } else {
                delete q.image;
            }
        }));

        let res = await putUpdateQuestion(question.id, quizId, question.description, question.image)
        const addAnswers = question.answers.filter(ans => !ans.id)
        const deleteAnswers = currentQuestionUpdate.answers.filter(oldAns => !question.answers.some(newAns => newAns.id === oldAns.id))

        for (const answer of addAnswers) {
            await postNewAnswer(answer.description, answer.isCorrect, currentQuestionUpdate.id);
        }


        for (const answer of deleteAnswers) {
            await deleteAnswer(answer.id);
        }

        for (let i = 0; i < question.answers.length; i++) {
            const answer = question.answers[i];
            const originalAnswer = currentQuestionUpdate.answers.find(a => a.id === answer.id);
            if (
                answer.id &&
                (answer.description !== originalAnswer?.description ||
                    Boolean(answer.isCorrect) !== Boolean(originalAnswer?.isCorrect))
            ) {
                const res = await putUpdateAnswer(
                    answer.description,
                    Boolean(answer.isCorrect),
                    +question.id,
                    +answer.id
                );

            }
        }



        await fetchQuestion();

        setQuestion( defaultQuestion);
        setImage(null);
        setPreviewImage(null);
        setIsEditQuestion(false);
        setCurrentIdQuestion('');
    };



    return (
        <div className="create-question-container">

            <div className="form-column">
                <h2>{!isEditQuestion ? 'Add new question' : 'Edit question'}</h2>

                <div className="form-group">
                    <label>	Question content:</label>
                    <input
                        type="text"
                        value={question.description}
                        onChange={(e) => setQuestion({ ...question, description: e.target.value })}
                        placeholder={!isEditQuestion ? "Input your question..." : undefined}
                    />
                </div>

                <div className="form-group">
                    <label className='form-label label-upload' htmlFor="labelUpload">
                        <FaCirclePlus /> Upload file image
                    </label>
                    <input
                        type="file"
                        hidden
                        id='labelUpload'
                        onChange={handleUploadImage}
                    />
                    {previewImage && <img src={previewImage} className="preview-img" />}

                </div>

                <div className="form-group">
                    <label>	Answer:</label>
                    {question && question.answers.map((ans, idx) => (
                        <div key={`answer-${idx}`} className="answer-row">
                            <input
                                type="text"
                                value={ans.description}
                                onChange={(e) => handleAnswerChange(idx, 'description', e.target.value)}
                                placeholder={`Answer ${idx + 1}`}
                            />
                            <input
                                type="radio"
                                name="correctAnswer"
                                checked={ans.isCorrect}
                                onChange={() => handleAnswerChange(idx, 'isCorrect', true)}
                            />
                            {question.answers.length > 1 && (
                                <button className="remove-btn" onClick={() => handleRemoveAnswer(idx)}>✕</button>
                            )}
                        </div>
                    ))}
                    <div className="action-row">
                        {isEditQuestion &&
                            (<button className="cancel-btn btn btn-outline-secondary"
                                onClick={() => { handleCancel() }}
                            >Cancel</button>)
                        }
                        <button
                            className="add-answer-btn"
                            onClick={handleAddAnswer}
                        >Add answer</button>
                        <button className="submit-btn"
                            onClick={!isEditQuestion ? () => handleSubmit() : () => { handleUpdateQuestion() }}
                            disabled={!isEnableSubmit}
                        >
                            {!isEditQuestion ? 'Save' : 'Update'}
                        </button>
                    </div>

                </div>


            </div>

            {/* Cột phải: Preview câu hỏi đã tạo */}
            <div className="preview-column">
                <h2>Question list</h2>
                {questions.length === 0 ? (
                    <p>Chưa có câu hỏi nào.</p>
                ) : (
                    questions.map((q, i) => (
                        <div key={`question-${q.id}`}
                            className={`preview-card ${currentIdQuestion === q.id ? 'active' : ''}`}
                        >
                            <p className="preview-question">{q.description}</p>
                            {q.image && (
                                <img
                                    src={
                                        q.image instanceof File
                                            ? URL.createObjectURL(q.image)
                                            : typeof q.image === 'string' && q.image.startsWith('data:')
                                                ? q.image
                                                : `data:image/jpeg;base64,${q.image}`
                                    }
                                    alt="preview"
                                    className="preview-img"
                                />
                            )}

                            <ul className="preview-answers">
                                {q.answers.map((ans, idx) => (
                                    <li key={idx} className={ans.isCorrect ? 'correct' : ''}>
                                        {String.fromCharCode(65 + idx)}. {ans.description}
                                    </li>
                                ))}
                            </ul>
                            <div className="action-buttons d-flex justify-content-end mt-2">
                                <button
                                    className="btn btn-outline-success btn-sm me-2"
                                    onClick={() => { handleEditQuestion(q) }}
                                >
                                    Edit
                                </button>
                                <button
                                    className="btn btn-outline-danger btn-sm"
                                    onClick={() => { handleDeleteQuestion(q) }}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>

                    ))
                )}
            </div>
            <ModalDeleteQuestion
                show={showModalDeleteQuestion}
                setShow={setShowModalDeleteQuestion}
                dataDelete={dataDelete}
                quizId={quizId}
                fetchQuestion={fetchQuestion}
                handleCancel = {handleCancel}

            />
        </div >
    );
};

export default Questions;
