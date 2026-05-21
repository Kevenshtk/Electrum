import { useContext } from 'react';

import { FaPhone, FaRegEnvelope, FaLocationDot } from 'react-icons/fa6';
import { Link, useNavigate } from 'react-router-dom';

import { AuthContext } from '../../context/auth';

import alert from '../../utils/alert';

import Button from '../../components/Button';

import './styles.sass';

const Footer = () => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleNavegate = () => {
    currentUser.status
      ? navigate(`/shoppingCar/${currentUser.id}`)
      : alert.login();
  };

  return (
    <footer>
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
            <FaLocationDot className="icon" />{' '}
            <a
              href="https://www.google.com/maps"
              target="_blank"
              rel="noopener noreferrer"
            >
              Rua Teste, 1234
            </a>
          </p>
          <p>
            <FaPhone className="icon" />{' '}
            <a
              href="https://web.whatsapp.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              (48)99999-0000
            </a>
          </p>
          <p>
            <FaRegEnvelope className="icon" />{' '}
            <a
              href="mailto:electrum@email.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              electrum@email.com
            </a>
          </p>
        </div>

        <div className="footer-top-categories">
          <h3>Categorias</h3>
          <ul>
            <li>
              <Button
                className="btn-simples"
                text="Promoções"
                onClick={alert.unavailable}
              />
            </li>
            <li>
              <Button
                className="btn-simples"
                text="Headsets"
                onClick={alert.unavailable}
              />
            </li>
            <li>
              <Link to="/list/pc-gamer">PC Gamer</Link>
            </li>
            <li>
              <Link to="/list/camera">Câmeras</Link>
            </li>
            <li>
              <Button
                className="btn-simples"
                text="Mouse e teclado"
                onClick={alert.unavailable}
              />
            </li>
          </ul>
        </div>

        <div className="footer-top-information">
          <h3>Informações</h3>
          <ul>
            <li>
              <Button
                className="btn-simples"
                text="Sobre nós"
                onClick={alert.unavailable}
              />
            </li>
            <li>
              <Button
                className="btn-simples"
                text="Entre em contato"
                onClick={alert.unavailable}
              />
            </li>
            <li>
              <Button
                className="btn-simples"
                text="Política de privacidade"
                onClick={alert.unavailable}
              />
            </li>
            <li>
              <Button
                className="btn-simples"
                text="Pedidos e devoluções"
                onClick={alert.unavailable}
              />
            </li>
            <li>
              <Button
                className="btn-simples"
                text="Termos e condições"
                onClick={alert.unavailable}
              />
            </li>
          </ul>
        </div>

        <div className="footer-top-menu">
          <h3>Menu</h3>
          <ul>
            <li>
              <Button
                className="btn-simples"
                text="Minha Conta"
                onClick={alert.unavailable}
              />
            </li>
            <li>
              <Button
                className="btn-simples"
                text="Carrinho"
                onClick={handleNavegate}
              />
            </li>
            <li>
              <Button
                className="btn-simples"
                text="Lista de Desejos"
                onClick={alert.unavailable}
              />
            </li>
            <li>
              <Button
                className="btn-simples"
                text="Rastrear Pedido"
                onClick={alert.unavailable}
              />
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
