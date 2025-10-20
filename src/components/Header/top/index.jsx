import {
  FaPhone,
  FaRegEnvelope,
  FaLocationDot,
  FaDollarSign,
  FaUser,
} from 'react-icons/fa6';
import Button from '../../Button';
import { Link } from 'react-router-dom';

import './styles.sass';

const HeaderTop = ({currentUser, handleShowModal}) => {
  return (
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
            <Link to="/">
              <FaDollarSign className="icon" />
              BRL
            </Link>
          </span>
          <FaUser className="icon" />
          <Button
            className="btn-simples"
            text={currentUser.status ? currentUser.name : 'Login '}
            onClick={() => !currentUser.status && handleShowModal('login')}
          />
          {!currentUser.status && (
            <Button
              className="btn-simples register"
              text="Registrar"
              onClick={() => handleShowModal('register')}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default HeaderTop;
