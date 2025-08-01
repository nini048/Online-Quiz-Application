import { useEffect, useRef, useState } from "react";
import { useParams, useLocation } from "react-router";
import {
    getDataQuiz,
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
    const [isShowModalResult, setIsShowModalResult] = useState(false);
    const [dataModalResult, setDataModalResult] = useState({});
    const setRef = (el, index) => {
        if (el) {
            refDiv.current[index] = el;
        }
    };

    useEffect(() => {
        fetchQuestions();
    }, [quizId]);


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
        let payload = {
            quizId: +quizId,
            answers: [],
        };

        if (dataQuiz && dataQuiz.length > 0) {
            const answers = dataQuiz.map((item) => ({
                questionId: +item.id,
                userAnswerId: item.selectedAnswerId,
            }));

            payload.answers = answers;

            let res = await postSubmitQuiz(payload);
            console.log("res: ", res);
            if (res && res.EC === 0) {
                setDataModalResult({
                    countCorrect: res.DT.countCorrect,
                    countTotal: res.DT.countTotal,
                    quizData: res.DT.quizData,
                });
                setIsShowModalResult(true);
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
                />
            </div>

            <ModalResult
                show={isShowModalResult}
                setShow={setIsShowModalResult}
                dataModalResult={dataModalResult}
            />
        </div>
    );
};

export default DetailQuiz;
