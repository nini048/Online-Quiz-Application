import CountDown from "./CountDown";
import { useRef, useEffect, useState } from "react";
import ModalSubmit from "./ModalSubmit";
const TimerContent = (props) => {

    const { dataQuiz, refDiv, setRef, isSubmit, countCorrect, countTotal,
        setIsSubmit, handleSubmit, showModalSubmit, setShowModalSubmit,
        handleResetQuiz, isRestart } = props;

   
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
                    isSubmit={isSubmit}
                    isRestart = {isRestart}
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
                <button className="btn btn-secondary"
                    onClick={ !isSubmit 
                        ? () => { setShowModalSubmit(true) }
                        : () => {handleResetQuiz()}
                    }
                >{!isSubmit ? 'Submit' : 'Restart'}</button>

            </div>
            <div className="result-content">
                {isSubmit && (
                    <div className="result-summary">
                        <span className="correct-count">Correct: {countCorrect}</span>
                        <span className="total-count"> / {countTotal}</span>
                    </div>
                )}
            </div>
            {isSubmit && (
                <div className="progress-bar-container">
                    <div className="progress-bar-background">
                        <div
                            className="progress-bar-fill"
                            style={{
                                width: `${Math.round((countCorrect / countTotal) * 100)}%`,
                            }}
                        ></div>
                    </div>
                    <div className="progress-label">
                        {Math.round((countCorrect / countTotal) * 100)}%
                    </div>
                </div>
            )}
            <ModalSubmit
                show={showModalSubmit}
                setShow={setShowModalSubmit}
                isSubmit={isSubmit}
                setIsSubmit={setIsSubmit}
                handleSubmit = {handleSubmit}
            />




        </>
    );
};

export default TimerContent;
