import _ from "lodash"
import "./Question.scss";
import image_default from './defaultImage.jpeg'
const Question = (props) => {
    const { data, index } = props;
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
    return (
        <>

            <div className="q-image">
                <img src={data.image
                    ? `data:image/jpeg;base64,${data.image}`
                    : image_default}
                />
            </div>

            <div className="question">Question {index + 1}: {data.questionDescription}?</div>
            <div className="answer-list">
                {data.answers &&
                    data.answers.length > 0 &&
                    data.answers.map((a, i) => (
                        <label key={`answer-${i}`} className="answer-option">
                            <input
                                type="radio"
                                name={`question-${index}`}
                                checked={+data.selectedAnswerId === +a.id}
                                onChange={(event) => handleCheckbox(event, a.id, data.questionId)} />
                            <span className="custom-radio">{getLabelLetter(i)}</span>
                            <span className="answer-text">{a.description}</span>
                        </label>
                    ))}
            </div>

        </>


    )
}
export default Question