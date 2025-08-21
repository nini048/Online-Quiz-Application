import _ from "lodash"
import "./Question.scss";
import image_default from './defaultImage.jpeg'
const Question = (props) => {
    const { data, index, isSubmit, resultQuiz } = props;
  

    const getLabelLetter = (i) => {
        return String.fromCharCode(65 + i);
    };
    const handleCheckbox = (event, answerId, questionId) => {

        props.handleCheckbox(answerId, questionId)
    }


    if (_.isEmpty(data)) {
        return (
            <></>
        )
    }
    const classOptionResult = (answerId) => {

        if (!isSubmit || !resultQuiz || resultQuiz.length === 0) return "";

        const currentQuestion = resultQuiz.find(q => q.questionId === data.id);

        if (!currentQuestion) return "";
      

        const correctAnswers = Array.isArray(currentQuestion.systemAnswers)
            ? currentQuestion.systemAnswers.map(ans => ans.id)
            : [];

        const selectedAnswer = Array.isArray(currentQuestion.userAnswers)

            ? currentQuestion.userAnswers
            : [];
    
        if (correctAnswers.includes(answerId)) {
            if (!selectedAnswer.includes(answerId)) {
                return "missed";
            }
     
            return "correct";
        }

      if (selectedAnswer.includes(answerId) && !correctAnswers.includes(answerId)) {
    return "wrong";
}


        return "";
    };

    return (
        <>

            <div className="q-image">
                <img src={data.imageFile
                    ? `data:image/jpeg;base64,${data.imageFile}`
                    : image_default}
                />
            </div>

            <div className="question">Question {index + 1}: {data.description}?</div>
            <div className="answer-list">
                {data.answers &&
                    data.answers.length > 0 &&
                    data.answers.map((a, i) => (
                        <label key={`answer-${i}`} className={`answer-option ${classOptionResult(a.id)}`}>
                            <input
                                type="radio"
                                name={`question-${index}`}
                                checked={+data.selectedAnswerId === +a.id}
                                disabled={isSubmit}
                                onChange={(event) => handleCheckbox(event, a.id, data.id)} />
                            <span className="custom-radio">{getLabelLetter(i)}</span>
                            <span className="answer-text">{a.description}</span>
                        </label>
                    ))}
            </div>

        </>


    )
}
export default Question