import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/auth';
import Button from '../Button';
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
              <Button
                className="btn-simples"
                text="Promoções"
                onClick={handleAlert}
              />
            </li>
            <li>
              <Button
                className="btn-simples"
                text="Headsets"
                onClick={handleAlert}
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
                onClick={handleAlert}
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
                onClick={handleAlert}
              />
            </li>
            <li>
              <Button
                className="btn-simples"
                text="Entre em contato"
                onClick={handleAlert}
              />
            </li>
            <li>
              <Button
                className="btn-simples"
                text="Política de privacidade"
                onClick={handleAlert}
              />
            </li>
            <li>
              <Button
                className="btn-simples"
                text="Pedidos e devoluções"
                onClick={handleAlert}
              />
            </li>
            <li>
              <Button
                className="btn-simples"
                text="Termos e condições"
                onClick={handleAlert}
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
                onClick={handleAlert}
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
                onClick={handleAlert}
              />
            </li>
            <li>
              <Button
                className="btn-simples"
                text="Rastrear Pedido"
                onClick={handleAlert}
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
