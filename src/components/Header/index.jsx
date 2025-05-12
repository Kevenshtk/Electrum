import "./styles.sass";

const Header = () => {
  return (
    <header>
      <div className="header-top">
        <div className="header-top-container">
          <div className="store-info-container">
            <span>(48) 99999-0000</span>
            <span>electrum@email.com</span>
            <span>Rua Teste, 1234</span>
          </div>
          <div className="header-user-top-menu">
            <span>
              <a href="#">BRL</a>
            </span>
            <span>
              <a href="#">Minha Conta</a>
            </span>
          </div>
        </div>
      </div>

      <div className="main-header">
        <div className="main-header-container">
          <a href="#" id="brand">
            Electrum
          </a>
          <form action="" id="search-form">
            <input type="text" id="search" placeholder="Busque aqui" />
            <input type="submit" className="btn btn-half" value="Pesquisar" />
          </form>
          <div className="header-actions-menu">
            <div className="wishlist-container">
              <span className="qty">0</span>
              <a href="#">Favoritos</a>
            </div>
            <div className="header-cart-container">
              <span className="qty">0</span>
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
