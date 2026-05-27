import Timer from '../../../components/Timer';
import alert from '../../../utils/alert.js';

import './styles.sass';

const DealSection = () => {
  return (
    <section className="deal-container">
      <div className="deal-container-content">
        <Timer
          endDate={new Date(
            Date.now() + ((2 * 24 + 12) * 60 * 60 + 25 * 60 + 33) * 1000
          ).toISOString()}
        />
        <h2 className="deal-container-content-title">Promoção de Fone Gamer</h2>
        <p className="deal-container-content-subtitle">
          Toda a linha gamer com 50% de desconto
        </p>
        <button className="btn" onClick={alert.unavailable}>
          Comprar Agora
        </button>
      </div>
    </section>
  );
};

export default DealSection;
