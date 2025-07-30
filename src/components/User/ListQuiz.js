import { useEffect, useState } from "react"
import { getQuizByUser } from "../../services/apiServices";
import './ListQuiz.scss'
import { useNavigate } from "react-router";

const ListQuiz = (props) => {
    const navigate = useNavigate();
    const [arrQiz, setArrQuiz] = useState([]);

    useEffect(() => {
        getQuizData();
    }, [])
    const getQuizData = async () => {

        const res = await getQuizByUser();
    
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
                            <h5 className="card-title">Quiz {index + 1}</h5>
                            <p className="card-text">{quiz.description}</p>
                            <button className="btn-start"
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