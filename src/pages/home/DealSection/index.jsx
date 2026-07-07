import { useState } from 'react';

import Timer from '../../../components/Timer';
import Button from '../../../components/Button';
import alert from '../../../utils/alert.js';

import './styles.sass';

const DealSection = () => {
  const [endDate] = useState(() =>
    new Date(
      Date.now() + ((2 * 24 + 12) * 60 * 60 + 25 * 60 + 33) * 1000
    ).toISOString()
  );

  return (
    <section className="deal-container">
      <div className="deal-container-content">
        <Timer endDate={endDate} />

        <h2 className="deal-container-content-title">Promoção de Fone Gamer</h2>
        <p className="deal-container-content-subtitle">
          Toda a linha gamer com 50% de desconto
        </p>
        <Button
          className="btn"
          text="Comprar Agora"
          onClick={alert.unavailable}
        />
      </div>
    </section>
  );
};

export default DealSection;
