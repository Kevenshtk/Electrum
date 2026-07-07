import { useContext } from 'react';

import { MdDeleteOutline } from 'react-icons/md';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

import { ShoppingCartContext } from '../../context/shoppingCart.jsx';
import { AuthContext } from '../../context/auth.jsx';
import { FavoriteContext } from '../../context/favorites.jsx';

import Button from '../Button';

import { formatPrice, formatCategory } from '../../utils/textFormatter.js';

import './styles.sass';

const CardHorizontal = ({ idProduct, image, category, name, price, qtd }) => {
  const { removeShoppingCart, incrementQuant, decrementQuant } =
    useContext(ShoppingCartContext);

  const quantProducts = (action) => {
    if (action === 'increment') {
      incrementQuant(idProduct);
    } else {
      decrementQuant(idProduct);
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


const CardVertical = ({
  idProduct,
  className,
  tag,
  image,
  category,
  name,
  price,
}) => {
  const { currentUser } = useContext(AuthContext);
  const { addFavorites, removeFavorites, isFavorite } =
    useContext(FavoriteContext);
  const { addShoppingCart } = useContext(ShoppingCartContext);

  const toggleFavorite = () => {
    isFavorite(idProduct)
      ? removeFavorites(idProduct)
      : addFavorites(idProduct);
  };

  return (
    <div className={`card-product-${className}`}>
      <span className={`label ${tag}`}>{tag}</span>

      {currentUser.status && (
        <button className="btn-favorite" onClick={toggleFavorite}>
          {isFavorite(idProduct) ? (
            <FaHeart size={20} />
          ) : (
            <FaRegHeart size={20} />
          )}
        </button>
      )}

      <div className="card-product-image">
        <img src={image} alt={name} />
      </div>

      <div className="card-product-info">
        <p className="product-category">{formatCategory(category)}</p>
        <h3 className="product-name">{name}</h3>
        <p className="product-price">R$ {formatPrice(price)}</p>
      </div>

      <Button
        className="btn"
        text="Comprar"
        onClick={() => addShoppingCart(idProduct)}
      />
    </div>
  );
};

export { CardHorizontal, CardVertical };
