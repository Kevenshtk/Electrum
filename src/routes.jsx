import { lazy, Suspense } from 'react';
import { useContext } from 'react';

import { Routes, Route } from 'react-router-dom';

import { AuthContext } from './context/auth';

import useWakeUpAPI from './hooks/useWakeUpAPI.js';

import Home from './pages/home';

const ProductsRegister = lazy(() => import('./pages/register/products'));
const ListProducts = lazy(() => import('./pages/listProducts'));
const Favorites = lazy(() => import('./pages/favorites'));
const ShoppingCar = lazy(() => import('./pages/shoppingCar'));

const MainRoutes = () => {
  const { currentUser } = useContext(AuthContext);
  const statusAPI = useWakeUpAPI();

  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <Routes>
        <Route path="/" element={<Home statusAPI={statusAPI} />} />
        <Route
          path="/register/products"
          element={
            currentUser.status ? (
              <ProductsRegister />
            ) : (
              <Home statusAPI={statusAPI} />
            )
          }
        />
        <Route path="/list/:category" element={<ListProducts />} />
        <Route
          path="/favorites/:idUser"
          element={
            currentUser.status ? <Favorites /> : <Home statusAPI={statusAPI} />
          }
        />
        <Route
          path="/shoppingCar/:idUser"
          element={
            currentUser.status ? (
              <ShoppingCar />
            ) : (
              <Home statusAPI={statusAPI} />
            )
          }
        />
      </Routes>
    </Suspense>
  );
};

export default MainRoutes;
