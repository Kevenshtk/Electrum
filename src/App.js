import { useEffect, useState } from 'react';

import { BrowserRouter as Router } from 'react-router-dom';

import { AuthContextProvider } from './context/auth.jsx';
import { FavoriteContextProvider } from './context/favorites.jsx';
import { ShoppingCartContextProvider } from './context/shoppingCart.jsx';

import alert from './utils/alert.js';

import Header from './components/Header';
import MainRoutes from './routes.jsx';
import Modal from './components/Modal';
import UserForm from './components/Forms/UserForm';

import './styles/reset.sass';

function App() {
  const [showModal, setShowModal] = useState(false);
  const [isFormRegister, setIsFormRegister] = useState(false);

  useEffect(() => {
    const hasSeenAlert = sessionStorage.getItem('hasSeenAlert');

    if (!hasSeenAlert) {
      alert.initial();
      sessionStorage.setItem('hasSeenAlert', true);
    }
  }, []);

  return (
    <>
      <Router>
        <AuthContextProvider>
          <FavoriteContextProvider>
            <ShoppingCartContextProvider>
              <Header
                setShowModal={setShowModal}
                setIsFormRegister={setIsFormRegister}
              />

              <MainRoutes />

              {showModal && (
                <Modal setShowModal={setShowModal}>
                  <UserForm
                    setShowModal={setShowModal}
                    isFormRegister={isFormRegister}
                  />
                </Modal>
              )}
            </ShoppingCartContextProvider>
          </FavoriteContextProvider>
        </AuthContextProvider>
      </Router>
    </>
  );
}

export default App;
