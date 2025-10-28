import { useContext } from 'react';

import { AuthContext } from '../../context/auth';

import HeaderTop from './top';
import HeaderMain from './main';
import HeaderBottom from './bottom';


import './styles.sass';

const Header = ({ setShowModal, setIsFormRegister }) => {
  const { currentUser } = useContext(AuthContext);

  const handleShowModal = (button) => {
    button === 'register' ? setIsFormRegister(true) : setIsFormRegister(false);
    setShowModal(true);
  };

  return (
    <header>
      <HeaderTop currentUser={currentUser} handleShowModal={handleShowModal}/>
      <HeaderMain currentUser={currentUser} />
      <HeaderBottom />
    </header>
  );
};

export default Header;
