import { useEffect, useState } from "react"
import { getAllQuiz, getQuizByUser, getQuizByUserId } from "../../services/apiServices";
import './ListQuiz.scss'
import { useNavigate } from "react-router";
import { useStateManager } from "react-select";
import { useSelector } from "react-redux";


const ListQuiz = (props) => {
    const navigate = useNavigate();
    const [arrQiz, setArrQuiz] = useState([]);

    const userId = useSelector(state => state.user.account.id);
    console.log('userId: ', userId);

    useEffect(() => {
        getQuizData();
    }, [])
    const getQuizData = async () => {

        const res = await getAllQuiz();

        if (res && res.EC === 0) {
            setArrQuiz(res.DT);
        }

    }
    return (
        <div className="list-quiz-container container">
            {arrQiz && arrQiz.length > 0 && arrQiz.map((quiz, index) => {
                return (
                    <div key={`${index}-quiz`} className="quiz-card" style={{ width: "18rem" }}>
                        <img src={`data:image/jpeg;base64,${quiz.image}`} className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">{quiz.name}</h5>
                         
                            <p className="card-text">{quiz.description}</p>
                            <span className="quiz-level">Level: {quiz.difficulty}</span>

                         
                            <button className="btn-start btn btn-outline-secondary"
                                onClick={() => navigate(
                                    `${quiz.id}`,
                                    { state: { quizTitle: quiz.description } }
                                )} >
                                Start Now</button>
                        </div>
                    </div>
                )


            })}
            {arrQiz && arrQiz.length === 0 &&
                <div>You don't have any quiz now...</div>
            }

        </div>
    )
}
export default ListQuiz