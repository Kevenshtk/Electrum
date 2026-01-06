import { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Swal from 'sweetalert2';

import { AuthContextProvider } from './context/auth.jsx';
import { FavoriteContextProvider } from './context/favorites.jsx';
import { ShoppingCartContextProvider } from './context/shoppingCart.jsx';

import Modal from './components/Modal';
import UserForm from './components/Forms/UserForm';
import Header from './components/Header';
import MainRoutes from './routes.jsx';

import './styles/reset.sass';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 10000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  },
});

function App() {
  const [showModal, setShowModal] = useState(false);
  const [isFormRegister, setIsFormRegister] = useState(false);

  useEffect(() => {
    const hasSeenAlert = sessionStorage.getItem('hasSeenAlert');

    if (!hasSeenAlert) {
      Swal.fire({
        title: 'Projeto em Construção',
        text: 'Algumas funcionalidades ainda não estão disponíveis, e erros podem ocorrer durante o uso.',
        icon: 'warning',
      }).then((result) => {
        if (result.isConfirmed) {
          Toast.fire({
            icon: 'warning',
            title: 'Só um instante, estamos preparando os produtos para você!',
          });
        }
      });

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
