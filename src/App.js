import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/home';
import ProductsRegister from './pages/register/products';
import ListProducts from './pages/listProducts';
import { api } from './services/api.js';

import Swal from 'sweetalert2';

import './styles/reset.sass';

function App() {
  const [currentUser, setCurrentUser] = useState({
    status: false,
    email: '',
    name: '',
  });

  useEffect(() => {
    const hasSeenAlert = sessionStorage.getItem('hasSeenAlert');

    if (!hasSeenAlert) {
      Swal.fire({
        title: 'Projeto em Construção',
        text: 'funcionalidades como produtos favoritos, carrinho de compras e pesquisar produtos pelo campo de busca não estão disponíveis e bugs podem ser encontrados.',
        icon: 'warning',
      });

      sessionStorage.setItem('hasSeenAlert', true);

      const dataProducts = async () => {
        try {
          const response = await api.get('/products');
          if (response.status === 200) {
            console.log('Ok');
          }
        } catch (error) {
          console.error('Erro ao buscar dados:', error);
        }
      };

      dataProducts();
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Home currentUser={currentUser} setCurrentUser={setCurrentUser} />
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
