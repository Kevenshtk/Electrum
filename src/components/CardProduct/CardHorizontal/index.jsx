import { MdDeleteOutline } from "react-icons/md";

import './styles.sass';

const CardHorizontal = () => {
  return (
    <div className="cart-item">
      <div className="cart-item-image">
        <img
          src="https://http2.mlstatic.com/D_NQ_NP_686964-MLU72604274524_112023-O.webp"
          alt="Produto"
        />
      </div>

      <div className="cart-item-info">
        <span className="cart-item-category">MONITORES</span>
        <h3 className="cart-item-title">Monitor Gamer 29'' Ultrawide IPS LG</h3>
      </div>

      <div className="cart-item-price">
        <span className="cart-item-price-label">Preço unitário</span>
        <span className="cart-item-price-value">R$ 1.171,15</span>
      </div>

      <div className="cart-item-quantity">
        <span className="cart-item-quantity-label">Quantidade</span>
        <div className="cart-item-quantity-controls">
          <button className="cart-item-quantity-button">-</button>
          <input
            type="number"
            value="1"
            min="1"
            className="cart-item-quantity-input"
            readOnly
          />
          <button className="cart-item-quantity-button">+</button>
        </div>
      </div>

      <div className="cart-item-subtotal">
        <span className="cart-item-subtotal-label">Subtotal</span>
        <span className="cart-item-subtotal-value">R$ 1.171,15</span>
      </div>

      <button className="cart-item-remove"><MdDeleteOutline size={25}/></button>
    </div>
  );
};

export default CardHorizontal;
