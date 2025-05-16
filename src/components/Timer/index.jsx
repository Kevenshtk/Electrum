import "./styles.sass";

const Timer = () => {
  return (
    <div className="deal-container-content-timer">
      <div className="deal-container-timer">
        <span className="deal-container-timer-time">02</span>
        <span className="deal-container-timer-word">Dias</span>
      </div>
      <div className="deal-container-timer">
        <span className="deal-container-timer-time">12</span>
        <span className="deal-container-timer-word">Horas</span>
      </div>
      <div className="deal-container-timer">
        <span className="deal-container-timer-time">25</span>
        <span className="deal-container-timer-word">Minutos</span>
      </div>
      <div className="deal-container-timer">
        <span className="deal-container-timer-time">33</span>
        <span className="deal-container-timer-word">Segundos</span>
      </div>
    </div>
  );
};

export default Timer;
