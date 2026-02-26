import { FaBolt, FaHeart, FaCartShopping } from 'react-icons/fa6';
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../Button';

import { FavoriteContext } from '../../../context/favorites';
import { ShoppingCartContext } from '../../../context/shoppingCart';
import { AuthContext } from '../../../context/auth';

import './styles.sass';

const HeaderMain = ({ currentUser }) => {
  const navigate = useNavigate();
  const { favorites } = useContext(FavoriteContext);
  const { products } = useContext(ShoppingCartContext);
  const { alertToDoLogin } = useContext(AuthContext);

  const handleNavegate = (page) => {
    currentUser.status
      ? navigate(`/${page}/${currentUser.id}`)
      : alertToDoLogin();
  };

  return (
    <div className="main-header">
      <Link to="/" id="brand">
        Electrum
        <FaBolt className="icon" />
      </Link>

      <form action="" id="search-form">
        <input type="text" id="search" placeholder="Busque aqui" />
        <Button type="submit" className="btn btn-half" text="Pesquisar" />
      </form>

      <div className="header-actions-menu">
        <div className="wishlist-container">
          <span className="qty">{favorites ? favorites.length : 0}</span>
          <FaHeart className="icon" />
          <Button
            className="btn-simples"
            text="Favoritos"
            onClick={() => handleNavegate('favorites')}
          />
        </div>

        <div className="header-cart-container">
          <span className="qty">{products ? products.length : 0}</span>
          <FaCartShopping className="icon" />
          <Button
            className="btn-simples"
            text="Carrinho"
            onClick={() => handleNavegate('shoppingCar')}
          />
        </div>
      </div>
    </div>
  );
};

export default HeaderMain;
