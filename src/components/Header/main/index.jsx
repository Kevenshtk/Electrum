import { FaBolt, FaHeart, FaCartShopping } from 'react-icons/fa6';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../Button';
import Swal from 'sweetalert2';
import { FavoriteContext } from '../../../context/favorites';

import './styles.sass';

const HeaderMain = ({ currentUser }) => {
  const navigate = useNavigate();
  const { favorites } = useContext(FavoriteContext);

  const handleClickHome = () => {
    navigate('/');
  };

  const handleClickFavorites = () => {
    currentUser.status
      ? navigate(`/favorites/${currentUser.id}`)
      : Swal.fire({
          position: 'top',
          icon: 'warning',
          title: 'Por favor faça login para acessar!',
          showConfirmButton: false,
          timer: 1500,
        });
  };

  return (
    <div className="main-header">
      <a id="brand" onClick={handleClickHome}>
        Electrum
        <FaBolt className="icon" />
      </a>
      <form action="" id="search-form">
        <input type="text" id="search" placeholder="Busque aqui" />
        <Button type="submit" className="btn btn-half" text="Pesquisar" />
      </form>
      <div className="header-actions-menu">
        <div className="wishlist-container">
          <span className="qty">{favorites ? favorites.length : 0}</span>
          <FaHeart className="icon" />
          <a onClick={handleClickFavorites}>Favoritos</a>
        </div>
        <div className="header-cart-container">
          <span className="qty">0</span>
          <FaCartShopping className="icon" />
          <a href="/">Carrinho</a>
        </div>
      </div>
    </div>
  );
};

export default HeaderMain;
