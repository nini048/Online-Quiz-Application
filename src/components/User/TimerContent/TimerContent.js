import CountDown from "./CountDown";
import { useRef, useEffect } from "react";
const TimerContent = (props) => {

    const { dataQuiz, refDiv, setRef } = props;

    const onTimeUp = () => {
        props.handleSubmit();
    }
    useEffect(() => {
        if (refDiv.current.length > 0 && refDiv.current[0]) {
            if (refDiv.current[0].className === 'right-question') {
                refDiv.current[0].className = 'right-question clicked';
            }
        }
    }, [dataQuiz]);


    const getClassQuestion = (index, question) => {

        if (question && question.answers.length > 0) {
            if (question.selectedAnswerId) {
                return 'right-question selected';
            }

        }

        return 'right-question'
    }


    const handleClickedQuestion = (question, index) => {
        props.setIndex(index)
        if (refDiv.current[index].className === 'right-question') {
            refDiv.current[index].className = 'right-question clicked'
        }


    }
    return (
        <>
            <div className="main-timer">
                <CountDown
                    onTimeUp={onTimeUp}
                />
            </div>
            <div className="main-question">
                {dataQuiz && dataQuiz.length > 0 &&
                    dataQuiz.map((item, index) => {
                        return (
                            <div key={`question-right-${index}`}
                                className={getClassQuestion(index, item)}
                                onClick={() => { handleClickedQuestion(item, index) }}
                                ref={(el) => setRef(el, index)}
                            >
                                {index + 1}
                            </div>
                        )
                    })
                }


            </div>
            <div className="btn-submit-container">
                <button className="btn btn-secondary" onClick={() => props.handleSubmit()}>Submit</button>

            </div>
        </>
    );
};

export default TimerContent;
