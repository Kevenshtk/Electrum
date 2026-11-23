import { Link } from 'react-router-dom';
import {
  FaPhone,
  FaRegEnvelope,
  FaLocationDot,
  FaDollarSign,
  FaUser,
  FaClipboardList,
} from 'react-icons/fa6';

import useWindowWidth from '../../../hooks/useWindowWidth';

import Button from '../../../components/Button';

import './styles.sass';

const HeaderTop = ({ currentUser, handleShowModal, handleLogout }) => {
  const width = useWindowWidth();

  return (
    <div className="header-top">
      <div className="header-top-container">
        {width > 435 && (
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
        )}

        <div className="header-user-top-menu">
          <span>
            <Link to="/">
              <FaDollarSign className="icon" />
              BRL
            </Link>
          </span>
          <span>
            <FaUser className="icon" />
            <Button
              className="btn-simples"
              text={currentUser.status ? currentUser.name : 'Login'}
              onClick={() =>
                currentUser.status ? handleLogout() : handleShowModal('login')
              }
            />
          </span>

          {!currentUser.status && (
            <span>
              <Button
                className="btn-simples register"
                text="Registrar"
                onClick={() => handleShowModal('register')}
              />
            </span>
          )}

          {currentUser.name === 'Teste' && (
            <span className="btn-simples">
              <Link to="/admin/products">
                <FaClipboardList className="icon" />
                Painel
              </Link>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeaderTop;
