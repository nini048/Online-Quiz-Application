import { useEffect, useRef, useState } from "react";
import { useParams, useLocation } from "react-router";
import {
    postSubmitQuiz,
    getQuestionByQuizId,
} from "../../services/apiServices";
import "./DetailQuiz.scss";
import _ from "lodash";
import Question from "./Question";
import { Modal } from "react-bootstrap";
import ModalResult from "./ModalResult";
import TimerContent from "./TimerContent/TimerContent";

const DetailQuiz = (props) => {
    const refDiv = useRef([]);

    const params = useParams();
    const quizId = params.id;
    const location = useLocation();
    const [dataQuiz, setDataQuiz] = useState([]);
    const [index, setIndex] = useState(0);
    const [isShowModalResult, setShowModalResult] = useState(false);
    const [dataModalResult, setDataModalResult] = useState({});
    const [resultQuiz, setResultQuiz] = useState([])
    const [isSubmit, setIsSubmit] = useState(false)
    const [countCorrect, setCountCorrect] = useState('')
    const [showModalSubmit, setShowModalSubmit] = useState(false);
    const [countTotal, setCountTotal] = useState('')
    const [isRestart, setIsRestart] = useState(false)
    const setRef = (el, index) => {
        if (el) {
            refDiv.current[index] = el;
        }
    };

    useEffect(() => {
        fetchQuestions();
    }, [quizId]);


    const handleResetQuiz = () => {

        setDataQuiz([])
        setIndex(0)
        setIsSubmit(false)
        fetchQuestions()
        setCountCorrect('')
        setCountTotal('')
        setResultQuiz([])
        fetchQuestions()
        setIsRestart(true)
    }

    const fetchQuestions = async () => {
        let res = await getQuestionByQuizId(+quizId);

        if (res && res.EC === 0) {
            let data = res.DT.qa;
            const updatedData = data.map((q) => ({
                ...q,
                selectedAnswerId: "",
            }));
            setDataQuiz(updatedData);
        }
    };

    const handleCheckbox = (answerId, questionId) => {
        let dataQuizClone = _.cloneDeep(dataQuiz);
        const index = dataQuizClone.findIndex((item) => +item.id === +questionId);
        if (index !== -1) {
            dataQuizClone[index].selectedAnswerId = answerId;
            setDataQuiz(dataQuizClone);
        }
    };

    const handleNextBtn = () => {
        const nextIndex = index + 1;
        setIndex(nextIndex);

        if (refDiv.current[nextIndex].className === 'right-question') {
            refDiv.current[nextIndex].className = "right-question clicked";
        }
    };

    const handlePrevBtn = () => {
        const prevIndex = index - 1;

        setIndex(prevIndex);

        if (refDiv.current[prevIndex].className === 'right-question') {
            refDiv.current[prevIndex].className = "right-question clicked";
        }
    };

    const handleSubmit = async () => {
        setIsSubmit(true);
        setShowModalSubmit(false)
        let payload = {
            quizId: +quizId,
            answers: [],
        };


        if (dataQuiz && dataQuiz.length > 0) {

            const answers = dataQuiz.map((item) => ({
                questionId: +item.id,
                userAnswerId: Array.isArray(item.selectedAnswerId)
                    ? item.selectedAnswerId
                    : [item.selectedAnswerId],
            }));

            payload.answers = answers;


            let res = await postSubmitQuiz(payload);


            if (res && res.EC === 0) {
                const serverData = res.DT.quizData;
                setCountTotal(res.DT.countTotal)
                setCountCorrect(res.DT.countCorrect)

                setResultQuiz(serverData)
                serverData.forEach((data, index) => {
                    const isEmptyAnswer = !data.userAnswers
                        || data.userAnswers.length === 0
                        || data.userAnswers.every(ans => typeof ans === 'string'
                            && ans.trim() === '');
                    if (data.isCorrect === true) {
                        refDiv.current[index].className = "right-question corrected";
                    } else if (data.isCorrect === false && !isEmptyAnswer) {
                        refDiv.current[index].className = "right-question wrong";
                    } else if (isEmptyAnswer) {
                        refDiv.current[index].className = "right-question not-answered";
                    }
                });

            } else {
                alert("wrong");
            }
        }
    };

    return (
        <div className="detail-quiz-container">
            <div className="left-content">
                <div className="title">{location?.state?.quizTitle}</div>
                <hr />

                <div className="q-body">
                    <img />
                </div>

                <Question
                    index={index}
                    data={dataQuiz && dataQuiz.length > 0 ? dataQuiz[index] : []}
                    handleCheckbox={handleCheckbox}
                    isSubmit={isSubmit}
                    resultQuiz={resultQuiz}
                />

                <div className="footer">
                    <button
                        className="btn btn-secondary"
                        onClick={handlePrevBtn}
                        disabled={index === 0}
                    >
                        Prev
                    </button>

                    <button
                        className="btn btn-primary"
                        onClick={handleNextBtn}
                        disabled={index === dataQuiz.length - 1}

                    >
                        Next
                    </button>
                </div>
            </div>

            <div className="right-content">
                <TimerContent
                    dataQuiz={dataQuiz}
                    handleSubmit={handleSubmit}
                    setIndex={setIndex}
                    setRef={setRef}
                    refDiv={refDiv}
                    isSubmit={isSubmit}
                    resultQuiz={resultQuiz}
                    countCorrect={countCorrect}
                    countTotal={countTotal}
                    setIsSubmit={setIsSubmit}
                    showModalSubmit={showModalSubmit}
                    setShowModalSubmit={setShowModalSubmit}
                    handleResetQuiz={handleResetQuiz}
                    isRestart = {isRestart}
                />
            </div>

            <ModalResult
                show={isShowModalResult}
                setShow={setShowModalResult}
                dataModalResult={dataModalResult}
            />
        </div>
    );
};

export default DetailQuiz;
