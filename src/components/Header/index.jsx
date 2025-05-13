import Button from "../Button";
import "./styles.sass";
import {
  FaPhone,
  FaRegEnvelope,
  FaLocationDot,
  FaDollarSign,
  FaUser,
  FaBolt,
  FaHeart,
  FaCartShopping,
} from "react-icons/fa6";

const Header = () => {
  return (
    <header className="header">
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
              <a href="#">
                <FaDollarSign className="icon" />
                BRL
              </a>
            </span>
            <span>
              <a href="#">
                <FaUser className="icon" />
                Login
              </a>
            </span>
          </div>
        </div>
      </div>

      <div className="main-header">
        <div className="main-header-container">
          <a href="#" id="brand">
            Electrum
            <FaBolt className="icon" />
          </a>
          <form action="" id="search-form">
            <input type="text" id="search" placeholder="Busque aqui" />
            <Button type="submit" style="btn btn-half" text="Pesquisar" />
          </form>
          <div className="header-actions-menu">
            <div className="wishlist-container">
              <span className="qty">0</span>
              <FaHeart className="icon" />
              <a href="#">Favoritos</a>
            </div>
            <div className="header-cart-container">
              <span className="qty">0</span>
              <FaCartShopping className="icon" />
              <a href="#">Carrinho</a>
            </div>
          </div>
        </div>
      </div>

      <div className="header-bottom">
        <nav>
          <ul>
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">Promoções</a>
            </li>
            <li>
              <a href="#">Notebooks</a>
            </li>
            <li>
              <a href="#">Celulares</a>
            </li>
            <li>
              <a href="#">Câmeras</a>
            </li>
            <li>
              <a href="#">Acessórios</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
