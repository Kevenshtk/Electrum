import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Swal from 'sweetalert2';

import { AuthContextProvider } from './context/auth.jsx';
import useWakeUpAPI from './hooks/useWakeUpAPI.js';
import { Home } from './pages/home';
import ListProducts from './pages/listProducts';
import ProductsRegister from './pages/register/products';

import './styles/reset.sass';

function App() {
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
    <Router>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<Home statusAPI={statusAPI} />} />
          <Route path="/register/products" element={<ProductsRegister />} />
          <Route path="/list/:category" element={<ListProducts />} />
        </Routes>
      </AuthContextProvider>
    </Router>
  );
}

export default App;
