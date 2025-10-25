import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
<<<<<<< HEAD
=======
import Swal from 'sweetalert2';

import { AuthContextProvider } from './context/auth.jsx';
import { FavoriteContextProvider } from './context/favorites.jsx';
>>>>>>> develop
import useWakeUpAPI from './hooks/useWakeUpAPI.js';

import { Home } from './pages/home';
<<<<<<< HEAD
=======
import ListProducts from './pages/listProducts';
import Favorites from './pages/favorites';
>>>>>>> develop
import ProductsRegister from './pages/register/products';
import ListProducts from './pages/listProducts';

import Swal from 'sweetalert2';

import './styles/reset.sass';

function App() {
  const [currentUser, setCurrentUser] = useState({
    status: false,
    email: '',
    name: '',
  });

  const statusAPI = useWakeUpAPI();

  useEffect(() => {
    const hasSeenAlert = sessionStorage.getItem('hasSeenAlert');

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

    if (!hasSeenAlert) {
      Swal.fire({
        title: 'Projeto em Construção',
        text: 'Funcionalidades como favoritos, carrinho de compras e busca de produtos ainda não estão disponíveis, e erros podem ocorrer durante o uso.',
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
<<<<<<< HEAD
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
              statusAPI={statusAPI}
            />
          }
        />
        <Route path="/register/products" element={<ProductsRegister />} />
        <Route
          path="/list/:category"
          element={<ListProducts currentUser={currentUser} />}
        />
      </Routes>
    </Router>
=======
    <>
      <Router>
        <AuthContextProvider>
          <FavoriteContextProvider>
            <Header
              setShowModal={setShowModal}
              setIsFormRegister={setIsFormRegister}
            />

            <Routes>
              <Route path="/" element={<Home statusAPI={statusAPI} />} />
              <Route path="/register/products" element={<ProductsRegister />} />
              <Route path="/list/:category" element={<ListProducts />} />
              <Route path="/favorites/:idUser" element={<Favorites />} />
            </Routes>

            {showModal && (
              <Modal setShowModal={setShowModal}>
                <UserForm
                  setShowModal={setShowModal}
                  isFormRegister={isFormRegister}
                />
              </Modal>
            )}
          </FavoriteContextProvider>
        </AuthContextProvider>
      </Router>
    </>
>>>>>>> develop
  );
}

export default App;
