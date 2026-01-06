import { Routes, Route } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/auth';
import useWakeUpAPI from './hooks/useWakeUpAPI.js';

import { Home } from './pages/home';
import ProductsRegister from './pages/register/products';
import ListProducts from './pages/listProducts';
import Favorites from './pages/favorites';
import ShoppingCar from './pages/shoppingCar';

const MainRoutes = () => {
  const { currentUser } = useContext(AuthContext);
  const statusAPI = useWakeUpAPI();

  return (
    <Routes>
      <Route path="/" element={<Home statusAPI={statusAPI} />} />
      <Route path="/register/products" element={currentUser.status ? <ProductsRegister />: <Home statusAPI={statusAPI} />} />
      <Route path="/list/:category" element={<ListProducts />} />
      <Route path="/favorites/:idUser" element={currentUser.status ? <Favorites /> : <Home statusAPI={statusAPI} />} />
      <Route path="/shoppingCar/:idUser" element={currentUser.status ? <ShoppingCar /> : <Home statusAPI={statusAPI} />} />
    </Routes>
  );
};

export default MainRoutes;
