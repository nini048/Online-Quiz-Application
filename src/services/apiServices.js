import { current } from "@reduxjs/toolkit";
import axios from "../utils/axiosCustomize"

const postCreateNewUser = (email, password, username, role, image) => {
    const data = new FormData();
    data.append('email', email);
    data.append('password', password);
    data.append('username', username);
    data.append('role', role);
    data.append('userImage', image);
    return axios.post('api/v1/participant', data);
}
const getAllUsers = () => {
    return axios.get('api/v1/participant/all');
}
const putUpdateUser = (id, username, role, image) => {
    const data = new FormData();
    data.append('id', id);
    data.append('username', username);
    data.append('role', role);
    data.append('userImage', image);
    return axios.put('api/v1/participant', data);
}
const deleteUser = (userId) => {
    return axios.delete('api/v1/participant', { data: { id: userId } });
}
const getUserWithPaginate = (page, limit) => {
    return axios.get(`api/v1/participant?page=${page}&limit=${limit}`);
}
const postLogin = (email, password) => {
    return axios.post('/api/v1/login', { email, password });
}
const postRegister = (email, username, password) => {
    return axios.post('/api/v1/register', { email, username, password });
}
const getQuizByUser = () => {
    return axios.get('/api/v1/quiz-by-participant');
}
const getDataQuiz = (quizId) => {
    return axios.get(`/api/v1/questions-by-quiz?quizId=${quizId}`)
}
const postSubmitQuiz = (data) => {
    return axios.post('/api/v1/quiz-submit', { ...data });
}
const postCreateNewQuiz = (name, description, level, image) => {
    const data = new FormData();
    data.append('name', name);
    data.append('description', description);
    data.append('difficulty', level);
    data.append('quizImage', image);
    return axios.post('/api/v1/quiz', data)
}
const getAllQuiz = () => {
    return axios.get(`/api/v1/quiz/all`)
}
const deleteQuiz = (quizId) => {
    return axios.delete(`api/v1/quiz/${quizId}`);
}
const putUpdateQuiz = (id, description, quizName, level, image) => {
    const data = new FormData();
    data.append('id', id);
    data.append('name', quizName);
    data.append('description', description);
    data.append('quizImage', image);
    data.append('difficulty', level);
    return axios.put('api/v1/quiz', data);
}
const postNewQuestion = (quizId, description, image) => {
    const data = new FormData();
    data.append('quiz_id', quizId);
    data.append('description', description);
    data.append('questionImage', image);
    return axios.post('api/v1/question', data);
}
const postNewAnswer = (description, correct_answer, question_id) => {
    return axios.post('api/v1/answer', {
        description, correct_answer, question_id
    });
}
const getAllQuestionInQuiz = (quizId) => {
    return axios.get(`/api/v1/questions-by-quiz?quizId=${quizId}`)
}
const putUpdateQuestion = (id, quiz_id, description, image) => {
    const data = new FormData();
    data.append('id', id);
    data.append('quiz_id', quiz_id);
    data.append('description', description);
    data.append('questionImage', image);
    return axios.put('api/v1/question', data);
}
const putUpdateAnswer = (description, correct_answer, question_id, answer_id) => {
    const data = new FormData();
    data.append('description', description);
    data.append('correct_answer', correct_answer);
    data.append('question_id', question_id);
    data.append('answer_id', answer_id);
    return axios.put('api/v1/answer', data);
}
const postQuizToUser = (quizId, userId) => {
    return axios.post('/api/v1/quiz-assign-to-user', {
        quizId, userId
    });
}
const deleteQuestion = (id, quizId) => {
    const data = new FormData();
    data.append('id', id);
    data.append('quizId', quizId);

    return axios.delete(`api/v1/question`, {
        data: data,  
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};

const deleteAnswer = (answer_id) => {
    return axios.delete(`api/v1/answer/${answer_id}`);
}
// const getQuizByUserId = (userId) => {
//     return axios.get(`/api/v1/quiz/${userId}`)
// }
const postUpsertQA = (data) => {
    return axios.post(`/api/v1/quiz-upsert-qa`, { ...data })
}
const getQuestionByQuizId = (quizId) => {
    return axios.get(`/api/v1/quiz-with-qa/${quizId}`)
}
const getHistory = () => {
    return axios.get('/api/v1/history');
}
export {
    postCreateNewUser, getAllUsers, putUpdateUser, deleteUser,
    getUserWithPaginate, postLogin, postRegister, getQuizByUser,
    getDataQuiz, postSubmitQuiz, postCreateNewQuiz, getAllQuiz,
    deleteQuiz, putUpdateQuiz, postNewQuestion, postNewAnswer,
    getAllQuestionInQuiz, putUpdateQuestion, putUpdateAnswer,
    postQuizToUser, deleteQuestion, deleteAnswer, postUpsertQA,
    getQuestionByQuizId, getHistory
} 