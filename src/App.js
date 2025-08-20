import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import useWakeUpAPI from './hooks/useWakeUpAPI.js'

import { Home } from './pages/home';
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

    if (!hasSeenAlert) {
      Swal.fire({
        title: 'Projeto em Construção',
        text: 'funcionalidades como produtos favoritos, carrinho de compras e pesquisar produtos pelo campo de busca não estão disponíveis e bugs podem ser encontrados.',
        icon: 'warning',
      });

      Swal.fire({
        title: 'Observação!',
        text: 'Aguarde um momento até os produtos serem carregados.',
        icon: 'warning',
      });

      sessionStorage.setItem('hasSeenAlert', true);
    }
  }, []);

  return (
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
  );
}

export default App;
