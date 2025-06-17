import Button from '../Button';
import './styles.sass';
import {
  FaPhone,
  FaRegEnvelope,
  FaLocationDot,
  FaDollarSign,
  FaUser,
  FaBolt,
  FaHeart,
  FaCartShopping,
} from 'react-icons/fa6';

import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    category === 'Pc Gamer' && (category = 'PC-Gamer');
    navigate(`/list/${category}`);
  };

  return (
    <header>
      <div className="header-top">
        <div className="header-top-container">
          <div className="store-info-container">
            <span>
              <FaPhone className="icon" />
              (48) 99999-0000
            </span>
            <span>
              <FaRegEnvelope className="icon" />
              electrum@email.com
            </span>
            <span>
              <FaLocationDot className="icon" />
              Rua Teste, 1234
            </span>
          </div>
          <div className="header-user-top-menu">
            <span>
              <a href="/">
                <FaDollarSign className="icon" />
                BRL
              </a>
            </span>
            <span>
              <a href="/">
                <FaUser className="icon" />
                Login
              </a>
            </span>
          </div>
        </div>
      </div>

      <div className="main-header">
        <a href="/" id="brand">
          Electrum
          <FaBolt className="icon" />
        </a>
        <form action="" id="search-form">
          <input type="text" id="search" placeholder="Busque aqui" />
          <Button type="submit" className="btn btn-half" text="Pesquisar" />
        </form>
        <div className="header-actions-menu">
          <div className="wishlist-container">
            <span className="qty">0</span>
            <FaHeart className="icon" />
            <a href="/">Favoritos</a>
          </div>
          <div className="header-cart-container">
            <span className="qty">0</span>
            <FaCartShopping className="icon" />
            <a href="/">Carrinho</a>
          </div>
        </div>
      </div>

      <div className="header-bottom">
        <nav>
          <ul>
            {[
              'Periféricos',
              'Pc Gamer',
              'Hardware',
              'Notebooks',
              'Smartphones',
              'Câmeras',
              'Acessórios',
            ].map((category, index) => {
              return (
                <li key={index}>
                  <Button
                    className="btn-category"
                    text={category}
                    onClick={() => handleCategoryClick(category)}
                  />
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
