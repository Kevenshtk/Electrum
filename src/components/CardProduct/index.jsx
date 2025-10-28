import { useContext } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

import { AuthContext } from '../../context/auth.jsx';
import { FavoriteContext } from '../../context/favorites.jsx';
import { removeHyphen } from '../../utils/textFormatter.js';
import Button from '../Button';

import './styles.sass';

const CardProduct = ({
  idProduct,
  className,
  tag,
  image,
  category,
  name,
  price,
}) => {
  const { currentUser } = useContext(AuthContext);
  const { addFavorites, removeFavorites, isFavorite } = useContext(FavoriteContext);

  const toggleFavorite = () => {
    isFavorite(idProduct)
      ? removeFavorites(currentUser.id, idProduct)
      : addFavorites(currentUser.id, idProduct);
  };

  return (
    <div className={`products-grid-card-${className}`}>
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

      <img src={image} alt={name} />
      <p className="category">
        {category.includes('-') ? removeHyphen(category) : category}
      </p>
      <h3 className="product-name">{name}</h3>
      <p className="product-price">R$ {price}</p>
      <Button className="btn" text="Comprar" />
    </div>
  );
};

export default CardProduct;
