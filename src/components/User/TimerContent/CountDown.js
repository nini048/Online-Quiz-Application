import { useEffect, useState, useRef } from "react";

const CountDown = (props) => {
    const [count, setCount] = useState(60);
    const { onTimeUp, isSubmit, isRestart, } = props;
    const timerRef = useRef(null);
    const startTimer = () => {
        clearInterval(timerRef.current);
        timerRef.current = setInterval(() => {
            setCount(prev => {
                if (prev <= 1) {
                    clearInterval(timerRef.current);
                    onTimeUp();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };
    useEffect(() => {
        if (isSubmit) {
            clearInterval(timerRef.current);
            return;
        }

        if (isRestart) {
            clearInterval(timerRef.current);
            setCount(60);        
            startTimer();          
            return;
        }

        startTimer();             
        return () => {
            clearInterval(timerRef.current);
        };
    }, [isSubmit, isRestart, onTimeUp]);


    const formatTime = (seconds) => {
        const min = String(Math.floor(seconds / 60)).padStart(2, '0');
        const sec = String(seconds % 60).padStart(2, '0');
        return `${min}:${sec}`;
    };

    return (
        <div className="countdown-container">
            {formatTime(count)}
        </div>)
}
export default CountDown