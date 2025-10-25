import {
  createContext,
  useCallback,
  useEffect,
  useState,
  useContext,
} from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from './auth';

import {
  addProductToFavorites,
  deleteProductToFavorites,
  getProductsFavorites,
  getProductsById,
} from '../services/productService.js';

export const FavoriteContext = createContext();

export const FavoriteContextProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const { currentUser } = useContext(AuthContext);

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3500,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });

  const loadFavorites = useCallback(
    async (idUser) => {
      const result = await getProductsFavorites(idUser);

      if (result.success) {
        setFavorites(result.data);
      } else {
        Toast.fire({
          icon: 'warning',
          title: result.message,
        });
      }
    },
    [Toast]
  );

  useEffect(() => {
    if (currentUser.status) {
      loadFavorites(currentUser.id);
    }
  }, [currentUser, loadFavorites]);

  const addFavorites = async (idUser, idProduct) => {
    const result = await addProductToFavorites(idUser, idProduct);
    const product = await getProductsById(idProduct);

    if (result.success && product.success) {
      setFavorites((prev) => [...prev, product.data]);
    } else {
      Toast.fire({
        icon: 'warning',
        title: result.message,
      });
    }
  };

  const removeFavorites = async (idUser, idProduct) => {
    const result = await deleteProductToFavorites(idUser, idProduct);
    const product = await getProductsById(idProduct);

    if (result.success) {
      setFavorites((prev) => prev.filter((item) => item.id !== product.id));
    } else {
      Toast.fire({
        icon: 'warning',
        title: result.message,
      });
    }
  };

  const isFavorite = useCallback(
    (idProduct) => {
      return favorites.some((item) => item.id === idProduct);
    },
    [favorites]
  );

  return (
    <FavoriteContext.Provider
      value={{
        favorites,
        loadFavorites,
        addFavorites,
        removeFavorites,
        isFavorite,
      }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};
