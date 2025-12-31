import './styles.sass';
import { useContext } from 'react';
import { formatPrice } from '../../../utils/textFormatter.js';
import { ShoppingCartContext } from '../../../context/shoppingCart.jsx';

const AsideShoppingCar = () => {
  const { totalPrice } = useContext(ShoppingCartContext);

  return (
    <aside className="cart-summary">
      <h2 className="cart-summary-title">Resumo da Compra</h2>

      <div className="cart-summary-section">
        <div className="cart-summary-row">
          <span>Subtotal</span>
          <span>R$ {formatPrice(totalPrice)}</span>
        </div>
        <div className="cart-summary-row">
          <span>Frete</span>
          <span className="cart-summary-free">Grátis</span>
        </div>
        <div className="cart-summary-divider"></div>
        <div className="cart-summary-row cart-summary-total">
          <span>Total</span>
          <span>R$ 3.513,45</span>
        </div>
      </div>

      <div className="cart-summary-coupon">
        <input
          type="text"
          placeholder="Código do cupom"
          className="cart-summary-coupon-input"
        />
        <button className="cart-summary-coupon-button">Aplicar</button>
      </div>

      <div className="cart-summary-shipping">
        <p className="cart-summary-shipping-text">
          🚚 Frete grátis para compras acima de R$ 500,00
        </p>
      </div>

      <button className="cart-summary-checkout">Finalizar Compra</button>
    </aside>
  );
};

export default AsideShoppingCar;
