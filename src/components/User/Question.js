import _ from "lodash"
import "./Question.scss";
const Question = (props) => {
    const { data, index } = props;
    const getLabelLetter = (i) => {
        return String.fromCharCode(65 + i);
    };

    if (_.isEmpty(data)) {
        return (
            <></>
        )
    }
    return (
        <>
            {data.image &&
                <div className="q-image">
                     <img src={`data:image/jpeg;base64,${data.image}`} />
                </div>
            }
            <div className="question">Question {index + 1}: {data.questionDescription}?</div>
            <div className="answer-list">
                {data.answers &&
                    data.answers.length > 0 &&
                    data.answers.map((a, i) => (
                        <label key={`answer-${i}`} className="answer-option">
                            <input type="radio" name={`question-${index}`} value={a.id} />
                            <span className="custom-radio">{getLabelLetter(i)}</span>
                            <span className="answer-text">{a.description}</span>
                        </label>
                    ))}
            </div>

        </>


    )
}
export default Question