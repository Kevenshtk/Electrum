import { useState, useContext } from 'react';
import { MdDeleteOutline } from 'react-icons/md';
import { ShoppingCartContext } from '../../../context/shoppingCart.jsx';
import { formatPrice, formatCategory } from '../../../utils/textFormatter.js';

import './styles.sass';

const CardHorizontal = ({ idProduct, image, category, name, price, qtd }) => {
  const { removeShoppingCart, incrementQuant, decrementQuant } =
    useContext(ShoppingCartContext);

  const quantProducts = (action) => {
    switch (action) {
      case 'increment':
        incrementQuant(idProduct);
        break;
      case 'decrement':
        decrementQuant(idProduct);
        break;
    }
  };

  return (
    <div className="cart-item">
      <div className="cart-item-image">
        <img src={image} alt={`foto ${name}`} />
      </div>

      <div className="cart-item-info">
        <span className="cart-item-category">{formatCategory(category)}</span>
        <h3 className="cart-item-title">{name}</h3>
      </div>

      <div className="cart-item-price">
        <span className="cart-item-price-label">Preço unitário</span>
        <span className="cart-item-price-value">R$ {formatPrice(price)}</span>
      </div>

      <div className="cart-item-quantity">
        <span className="cart-item-quantity-label">Quantidade</span>
        <div className="cart-item-quantity-controls">
          <button
            className="cart-item-quantity-button"
            onClick={() => quantProducts('decrement')}
          >
            -
          </button>
          <input
            type="number"
            value={qtd}
            min="1"
            className="cart-item-quantity-input"
            readOnly
          />
          <button
            className="cart-item-quantity-button"
            onClick={() => quantProducts('increment')}
          >
            +
          </button>
        </div>
      </div>

      <div className="cart-item-subtotal">
        <span className="cart-item-subtotal-label">Subtotal</span>
        <span className="cart-item-subtotal-value">
          R$ {formatPrice(qtd * price)}
        </span>
      </div>

      <button
        className="cart-item-remove"
        onClick={() => removeShoppingCart(idProduct)}
      >
        <MdDeleteOutline size={25} />
      </button>
    </div>
  );
};

export default CardHorizontal;
