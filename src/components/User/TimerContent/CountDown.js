import { useEffect, useState } from "react";

const CountDown = (props) => {
    const [count, setCount] = useState(50000);
    const { onTimeUp } = props;
    useEffect(() => {
        if (count === 0) {
            onTimeUp();
            return;
        }
        const timer = setInterval(() => {
            setCount(count - 1)
        }, 1000);
        // setTimeout(() => {
        //     clearInterval(timer)
        // }, 1000)
        return () => {
            clearInterval(timer);
        }

    }, [count])
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