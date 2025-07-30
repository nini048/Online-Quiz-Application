import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router"
import { getDataQuiz,  postSubmitQuiz } from "../../services/apiServices";
import './DetailQuiz.scss'
import _ from "lodash";
import Question from "./Question";
import { Modal } from "react-bootstrap";
import ModalResult from "./ModalResult";
const DetailQuiz = (props) => {
    const params = useParams();
    const quizId = params.id;
    const location = useLocation();
    const [dataQuiz, setDataQuiz] = useState([]);
    const [index, setIndex] = useState(0);
    const [isShowModalResult, setIsShowModalResult] = useState(false);
    const [dataModalResult, setDataModalResult] = useState({})

    const handleCheckbox = (answerId, questionId) => {


        let dataQuizClone = _.cloneDeep(dataQuiz);

        const index = dataQuizClone.findIndex(item => +item.questionId === +questionId);

        if (index !== -1) {
            dataQuizClone[index].selectedAnswerId = answerId;
            setDataQuiz(dataQuizClone);
        }
    }
    const handleSubmit = async () => {
        let payload = {
            quizId: +quizId,
            answers: [],
        };
        let answers = [];
       
        if (dataQuiz && dataQuiz.length > 0) {
            dataQuiz.forEach(item => {
                let questionId = item.questionId;
                let userAnswerId = item.selectedAnswerId;
                answers.push({
                    questionId: +questionId,
                    userAnswerId: userAnswerId
                })
            })
            payload.answers = answers;
            let res = await  postSubmitQuiz(payload)
            console.log('res: ', res);
            if (res && res.EC === 0) {
                setDataModalResult({
                    countCorrect: res.DT.countCorrect,
                    countTotal: res.DT.countTotal,
                    quizData: res.DT.quizData
                })
                setIsShowModalResult(true)
            }
            else {
                alert ('wrong')
            }
        }
       

    }
    const fetchQuestions = async () => {
        let res = await getDataQuiz(quizId);
        if (res && res.EC === 0) {
            let raw = res.DT;
            let data = _.chain(raw)
                .groupBy("id")
                .map((value, key) => {
                    let answers = [];
                    let questionDescription, image = null
                    value.forEach((item, index) => {
                        if (index === 0) {
                            questionDescription = item.description;
                            image = item.image;
                        }

                        answers.push(item.answers);

                    })

                    return { questionId: key, answers, questionDescription, image, selectedAnswerId: '' }

                })
                .value()
            setDataQuiz(data)
        }

    }


    useEffect(() => {
        fetchQuestions();
    }, [quizId]);
    return (
        <div className="detail-quiz-container">
            <div className="left-content">
                <div className="title">
                    Quiz {quizId}: {location?.state?.quizTitle}
                </div>
                <hr />

                <div className="q-body">
                    <img />
                </div>
                <Question
                    index={index}
                    data={
                        dataQuiz && dataQuiz.length > 0 ? dataQuiz[index] : []}
                    handleCheckbox={handleCheckbox}
                />
                <div className="footer">
                    <button className="btn btn-secondary"
                        onClick={() => { setIndex(index - 1) }}
                        disabled={index === 0}
                    >Prev</button>

                    {index === dataQuiz.length - 1 ? (
                        <button className="btn btn-submit" onClick={handleSubmit}>Submit</button>
                    ) : (
                        <button className="btn btn-primary"
                            onClick={() => { setIndex(index + 1) }}
                            disabled={index === dataQuiz.length - 1}
                        >Next</button>
                    )}
                </div>
            </div>
            <div className="right-content">
                count down
            </div>
            <ModalResult
                show={isShowModalResult}
                setShow={setIsShowModalResult}
                dataModalResult = {dataModalResult}
            />
        </div>
    )
}
export default DetailQuiz