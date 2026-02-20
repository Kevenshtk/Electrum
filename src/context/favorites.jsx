import {
  createContext,
  useCallback,
  useEffect,
  useState,
  useContext,
} from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from './auth';
import favoritesService from '../services/product/favoritesService';

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

export const FavoriteContext = createContext();

export const FavoriteContextProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const { currentUser } = useContext(AuthContext);

  const loadFavorites = async (idUser) => {
    const result = await favoritesService.get(idUser);

    if (result.success) {
      setFavorites(result.data);
    } else {
      Toast.fire({
        icon: 'warning',
        title: result.message,
      });
    }
  };

  const addFavorites = async (idProduct) => {
    const result = await favoritesService.add(currentUser.id, idProduct);

    if (result.success) {
      loadFavorites(currentUser.id);
    } else {
      Toast.fire({
        icon: 'warning',
        title: result.message,
      });
    }
  };

  const removeFavorites = async (idProduct) => {
    const result = await favoritesService.del(currentUser.id, idProduct);

    if (result.success) {
      loadFavorites(currentUser.id);
    } else {
      Toast.fire({
        icon: 'warning',
        title: result.message,
      });
    }
  };

  const isFavorite = useCallback(
    (idProduct) => favorites.some((item) => item.id === idProduct),
    [favorites]
  );

  useEffect(() => {
    if (!currentUser?.id) {
      setFavorites([]);
    }

    loadFavorites(currentUser.id);
  }, [currentUser?.id]);

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
