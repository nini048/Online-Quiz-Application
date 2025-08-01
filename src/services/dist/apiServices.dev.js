"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteQuiz = exports.getAllQuiz = exports.postCreateNewQuiz = exports.postSubmitQuiz = exports.getDataQuiz = exports.getQuizByUser = exports.postRegister = exports.postLogin = exports.getUserWithPaginate = exports.deleteUser = exports.putUpdateUser = exports.getAllUsers = exports.postCreateNewUser = void 0;

var _axiosCustomize = _interopRequireDefault(require("../utils/axiosCustomize"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var postCreateNewUser = function postCreateNewUser(email, password, username, role, image) {
  var data = new FormData();
  data.append('email', email);
  data.append('password', password);
  data.append('username', username);
  data.append('role', role);
  data.append('userImage', image);
  return _axiosCustomize["default"].post('api/v1/participant', data);
};

exports.postCreateNewUser = postCreateNewUser;

var getAllUsers = function getAllUsers() {
  return _axiosCustomize["default"].get('api/v1/participant/all');
};

exports.getAllUsers = getAllUsers;

var putUpdateUser = function putUpdateUser(id, username, role, image) {
  var data = new FormData();
  data.append('id', id);
  data.append('username', username);
  data.append('role', role);
  data.append('userImage', image);
  return _axiosCustomize["default"].put('api/v1/participant', data);
};

exports.putUpdateUser = putUpdateUser;

var deleteUser = function deleteUser(userId) {
  return _axiosCustomize["default"]["delete"]('api/v1/participant', {
    data: {
      id: userId
    }
  });
};

exports.deleteUser = deleteUser;

var getUserWithPaginate = function getUserWithPaginate(page, limit) {
  return _axiosCustomize["default"].get("api/v1/participant?page=".concat(page, "&limit=").concat(limit));
};

exports.getUserWithPaginate = getUserWithPaginate;

var postLogin = function postLogin(email, password) {
  return _axiosCustomize["default"].post('/api/v1/login', {
    email: email,
    password: password
  });
};

exports.postLogin = postLogin;

var postRegister = function postRegister(email, username, password) {
  return _axiosCustomize["default"].post('/api/v1/register', {
    email: email,
    username: username,
    password: password
  });
};

exports.postRegister = postRegister;

var getQuizByUser = function getQuizByUser() {
  return _axiosCustomize["default"].get('/api/v1/quiz-by-participant');
};

exports.getQuizByUser = getQuizByUser;

var getDataQuiz = function getDataQuiz(quizId) {
  return _axiosCustomize["default"].get("/api/v1/questions-by-quiz?quizId=".concat(quizId));
};

exports.getDataQuiz = getDataQuiz;

var postSubmitQuiz = function postSubmitQuiz(data) {
  return _axiosCustomize["default"].post('/api/v1/quiz-submit', _objectSpread({}, data));
};

exports.postSubmitQuiz = postSubmitQuiz;

var postCreateNewQuiz = function postCreateNewQuiz(name, description, level, image) {
  var data = new FormData();
  data.append('name', name);
  data.append('description', description);
  data.append('difficulty', level);
  data.append('quizImage', image);
  return _axiosCustomize["default"].post('/api/v1/quiz', data);
};

exports.postCreateNewQuiz = postCreateNewQuiz;

var getAllQuiz = function getAllQuiz() {
  return _axiosCustomize["default"].get("/api/v1/quiz/all");
};

exports.getAllQuiz = getAllQuiz;

var deleteQuiz = function deleteQuiz(quizId) {
  return _axiosCustomize["default"]["delete"]("api/v1/quiz/".concat(quizId));
};

exports.deleteQuiz = deleteQuiz;

var putUpdateQuiz = function putUpdateQuiz(id, description, quizName, level, image) {
  var data = new FormData();
  data.append('id', id);
  data.append('name', quizName);
  data.append('description', description);
  data.append('quizImage', image);
  data.append('difficulty', level);
  return _axiosCustomize["default"].put('api/v1/quiz', data);
};