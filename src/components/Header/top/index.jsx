import {
  FaPhone,
  FaRegEnvelope,
  FaLocationDot,
  FaDollarSign,
  FaUser,
} from 'react-icons/fa6';
import Button from '../../Button';

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
          />
          {!currentUser.status && (
            <Button
              className="btn-register"
              text=" Registrar"
              onClick={() => handleShowModal('register')}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default HeaderTop;
