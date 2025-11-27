import { useContext } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

import { AuthContext } from '../../../context/auth.jsx';
import { FavoriteContext } from '../../../context/favorites.jsx';
import { ShoppingCartContext } from '../../../context/shoppingCart.jsx';
import { formatPrice, formatCategory } from '../../../utils/textFormatter.js';
import Button from '../../Button';

import './styles.sass';

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
      ? removeFavorites(currentUser.id, idProduct)
      : addFavorites(currentUser.id, idProduct);
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

export default CardVertical;
