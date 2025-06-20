import React, { useState, useEffect } from 'react';

const OtpTimer = ({ initialTime, onTimerComplete }) => {
    const [timeLeft, setTimeLeft] = useState(initialTime);

    useEffect(() => {
        if (timeLeft === 0) {
            if (onTimerComplete) onTimerComplete();
            return;
        }

        const timerId = setInterval(() => {
            setTimeLeft((prevTime) => prevTime - 1);
        }, 1000);

        return () => clearInterval(timerId);
    }, [timeLeft, onTimerComplete]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    return (
        <div>
            <p>Time left: {formatTime(timeLeft)}</p>
        </div>
    );
};

export default OtpTimer;
