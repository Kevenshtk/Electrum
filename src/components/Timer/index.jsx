import { useCallback, useEffect, useState } from 'react';

import './styles.sass';

const Timer = ({ endDate }) => {
  const calculateTimeLeft = useCallback(() => {
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
  }, [endDate]);

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    
    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  const pad = (num) => String(num).padStart(2, '0');

  const time = [
    { label: 'Dias', value: pad(timeLeft.days) },
    { label: 'Horas', value: pad(timeLeft.hours) },
    { label: 'Minutos', value: pad(timeLeft.minutes) },
    { label: 'Segundos', value: pad(timeLeft.seconds) },
  ];

  return (
    <div className="deal-container-content-timer">
      {time.map((t) => (
        <div className="deal-container-timer">
          <span className="deal-container-timer-time">{t.value}</span>
          <span className="deal-container-timer-word">{t.label}</span>
        </div>
      ))}
    </div>
  );
};

export default Timer;
