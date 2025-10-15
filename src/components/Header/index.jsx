import { useNavigate } from 'react-router-dom';
import { useCallback, useState } from 'react';
import useWindowWidth from '../../hooks/useWindowWidth';

import Button from '../Button';

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

import './styles.sass';

const categories = [
  'Periféricos',
  'Pc Gamer',
  'Hardware',
  'Notebooks',
  'Smartphones',
  'Câmeras',
  'Acessórios',
];

const Header = ({ currentUser, setShowModal, setIsFormRegister }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const width = useWindowWidth();
  const { currentUser } = useContext(AuthContext);

  const handleCategoryClick = useCallback(
    (category) => {
      category === 'Pc Gamer' && (category = 'PC-Gamer');
      navigate(`/list/${category}`);
    },
    [navigate]
  );

  const handleShowModal = useCallback(
    (button) => {
      setIsFormRegister(button === 'register');
      setShowModal(true);
      if (width <= 435) setIsOpen((prev) => !prev);
    },
    [width, setIsFormRegister, setShowModal]
  );

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

            <FaUser className="icon" />
            <Button
              className="btn-sign-in"
              text={currentUser.status ? currentUser.name : 'Login'}
              onClick={() => !currentUser.status && handleShowModal('login')}
              aria-label="Abrir login"
            />
            {!currentUser.status && (
              <Button
                className="btn-register"
                text=" Registrar"
                onClick={() => handleShowModal('register')}
                aria-label="Abrir formulário de cadastro"
              />
            )}
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
          {width >= 435 ? (
            <>
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
            </>
          ) : (
            <>
              <div className="header-user-container">
                <FaUser
                  className="icon"
                  onClick={() => setIsOpen(!isOpen)}
                  role="button"
                  aria-label="Menu do usuário"
                />
                {isOpen && (
                  <div className="dropdown-menu">
                    {currentUser.status ? (
                      <button className="dropdown-item">
                        {currentUser.name}
                      </button>
                    ) : (
                      <>
                        <button
                          className="dropdown-item"
                          onClick={() => handleShowModal('login')}
                          aria-label="Abrir login"
                        >
                          Login
                        </button>
                        <button
                          className="dropdown-item"
                          onClick={() => handleShowModal('register')}
                          aria-label="Abrir formulário de cadastro"
                        >
                          Registrar-se
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
              <div
                className="header-cart-container"
                role="button"
                aria-label="Carrinho de compras"
              >
                <FaCartShopping className="icon" />
              </div>
            </>
          )}
        </div>
      </div>

      <div className="header-bottom">
        <nav>
          <ul>
            {categories.map((category, index) => {
              if (
                width <= 435 &&
                (category === 'Periféricos' ||
                  category === 'Notebooks' ||
                  category === 'Câmeras')
              )
                return null;
              return (
                <li key={index}>
                  <Button
                    className="btn-category"
                    text={category}
                    onClick={() => handleCategoryClick(category)}
                    aria-label={`Abrir lista de ${category}`}
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
