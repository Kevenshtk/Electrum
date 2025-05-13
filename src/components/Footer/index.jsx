import "./styles.sass";
import {
  FaPhone,
  FaRegEnvelope,
  FaLocationDot
} from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-top-about">
          <h3>Sobre Nós</h3>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum
            repellat nesciunt eius dolores nulla, atque suscipit rem voluptate
            dignissimos accusamus sit quo non architecto ducimus culpa, numquam
            sunt odit aspernatur?
          </p>
          <p>
            <FaLocationDot className="icon" /> <a href="#">Rua Teste, 1234</a>
          </p>
          <p>
            <FaPhone className="icon" /> <a href="#">(48)99999-0000</a>
          </p>
          <p>
            <FaRegEnvelope className="icon" /> <a href="#">electrum@email.com</a>
          </p>
        </div>
        <div className="footer-top-categories">
          <h3>Categorias</h3>
          <ul>
            <li>
              <a href="#">Promoções</a>
            </li>
            <li>
              <a href="#">Headsets</a>
            </li>
            <li>
              <a href="#">PC Gamer</a>
            </li>
            <li>
              <a href="#">Câmeras</a>
            </li>
            <li>
              <a href="#">Mouse e teclado</a>
            </li>
          </ul>
        </div>
        <div className="footer-top-information">
          <h3>Informações</h3>
          <ul>
            <li>
              <a href="#">Sobre nós</a>
            </li>
            <li>
              <a href="#">Entre em contato</a>
            </li>
            <li>
              <a href="#">Política de privacidade</a>
            </li>
            <li>
              <a href="#">Pedidos e devoluções</a>
            </li>
            <li>
              <a href="#">Termos e condições</a>
            </li>
          </ul>
        </div>
        <div className="footer-top-menu">
          <h3>Menu</h3>
          <ul>
            <li>
              <a href="#">Minha Conta</a>
            </li>
            <li>
              <a href="#">Carrinho</a>
            </li>
            <li>
              <a href="#">Lista de Desejos</a>
            </li>
            <li>
              <a href="#">Rastrear Pedido</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="footer-bottom-payments">
          <i className="fab fa-cc-mastercard"></i>
          <i className="fab fa-cc-visa"></i>
          <i className="fab fa-cc-diners-club"></i>
          <i className="fab fa-cc-amazon-pay"></i>
          <i className="fab fa-cc-apple-pay"></i>
        </div>
        <p>Copyright &copy; 2025 - Electrum</p>
      </div>
    </footer>
  );
};

export default Footer;
