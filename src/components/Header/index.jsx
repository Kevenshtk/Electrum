import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../../context/auth';

import HeaderTop from './top';
import HeaderMain from './main';
import HeaderBottom from './bottom';


import './styles.sass';

const Header = ({ setShowModal, setIsFormRegister }) => {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  const handleCategoryClick = (category) => {
    category === 'Pc Gamer' && (category = 'PC-Gamer');
    navigate(`/list/${category}`);
  };

  const handleShowModal = (button) => {
    button === 'register' ? setIsFormRegister(true) : setIsFormRegister(false);
    setShowModal(true);
  };

  return (
    <header>
      <HeaderTop currentUser={currentUser} handleShowModal={handleShowModal}/>
      <HeaderMain />
      <HeaderBottom handleCategoryClick={handleCategoryClick}/>
    </header>
  );
};

export default Header;
