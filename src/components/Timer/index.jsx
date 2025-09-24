import { useEffect, useState } from 'react';

import './styles.sass';

const Timer = ({ endDate }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(endDate) - +new Date();

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (100 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [endDate]);

  const pad = (num) => String(num).padStart(2, '0');
  const days = pad(timeLeft.days);
  const hours = pad(timeLeft.hours);
  const minutes = pad(timeLeft.minutes);
  const seconds = pad(timeLeft.seconds);

  return (
    <div className="deal-container-content-timer">
      <div className="deal-container-timer">
        <span className="deal-container-timer-time">{days}</span>
        <span className="deal-container-timer-word">Dias</span>
      </div>
      <div className="deal-container-timer">
        <span className="deal-container-timer-time">{hours}</span>
        <span className="deal-container-timer-word">Horas</span>
      </div>
      <div className="deal-container-timer">
        <span className="deal-container-timer-time">{minutes}</span>
        <span className="deal-container-timer-word">Minutos</span>
      </div>
      <div className="deal-container-timer">
        <span className="deal-container-timer-time">{seconds}</span>
        <span className="deal-container-timer-word">Segundos</span>
      </div>
    </div>
  );
};

export default Timer;
