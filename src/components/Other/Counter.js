import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

function Counter(props) {
    const initialCountdown = localStorage.getItem('countdown') || 60;
    const [seconds, setSeconds] = useState(Number(initialCountdown));
    const navigate = useNavigate();

    const { isPaused, setIsPaused } = props;

    useEffect(() => {
        const timerInterval = setInterval(() => {
            if (seconds > 0 && !isPaused) {
                setSeconds(prevSeconds => prevSeconds - 1);
            } else if (seconds === 0) {
                clearInterval(timerInterval);
                localStorage.removeItem('countdown', seconds);
                localStorage.removeItem('isPaused', isPaused);
                navigate('/')
            }
        }, 1000);

        return () => {
            clearInterval(timerInterval);
            localStorage.setItem('isPaused', isPaused);
        };
    }, [seconds, isPaused]);

    useEffect(() => {
        const timerStartTime = sessionStorage.getItem('timerStartTime');
        const pausedState = localStorage.getItem('isPaused');

        if (timerStartTime) {
            const elapsedTime = (Date.now() - Number(timerStartTime)) / 1000;
            const remainingTime = initialCountdown - elapsedTime;

            if (remainingTime > 0) {
                setSeconds(Math.floor(remainingTime));
                setIsPaused(pausedState === 'true');
            }
        } else {
            sessionStorage.setItem('timerStartTime', Date.now());
        }
    }, [initialCountdown]);
    return (
        <span>{seconds} s</span>
    );
}

export default Counter;
