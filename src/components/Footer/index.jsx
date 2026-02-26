import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/auth';
import Swal from 'sweetalert2';

import { FaPhone, FaRegEnvelope, FaLocationDot } from 'react-icons/fa6';

import './styles.sass';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  },
});

const Footer = () => {
  const { alertToDoLogin, currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleNavegate = () => {
    currentUser.status
      ? navigate(`/shoppingCar/${currentUser.id}`)
      : alertToDoLogin();
  };

  const handleAlert = () => {
    Toast.fire({
      icon: 'warning',
      title: 'Funcionalidade ainda não disponível!',
    });
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
              <button onClick={handleAlert}>Promoções</button>
            </li>
            <li>
              <button onClick={handleAlert}>Headsets</button>
            </li>
            <li>
              <Link to="/list/pc-gamer">PC Gamer</Link>
            </li>
            <li>
              <Link to="/list/camera">Câmeras</Link>
            </li>
            <li>
              <button onClick={handleAlert}>Mouse e teclado</button>
            </li>
          </ul>
        </div>
        <div className="footer-top-information">
          <h3>Informações</h3>
          <ul>
            <li>
              <button onClick={handleAlert}>Sobre nós</button>
            </li>
            <li>
              <button onClick={handleAlert}>Entre em contato</button>
            </li>
            <li>
              <button onClick={handleAlert}>Política de privacidade</button>
            </li>
            <li>
              <button onClick={handleAlert}>Pedidos e devoluções</button>
            </li>
            <li>
              <button onClick={handleAlert}>Termos e condições</button>
            </li>
          </ul>
        </div>
        <div className="footer-top-menu">
          <h3>Menu</h3>
          <ul>
            <li>
              <button onClick={handleAlert}>Minha Conta</button>
            </li>
            <li>
              <button onClick={handleNavegate}>Carrinho</button>
            </li>
            <li>
              <button onClick={handleAlert}>Lista de Desejos</button>
            </li>
            <li>
              <button onClick={handleAlert}>Rastrear Pedido</button>
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
