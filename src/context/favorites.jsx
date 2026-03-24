import {
  createContext,
  useCallback,
  useEffect,
  useState,
  useContext,
} from 'react';

import { AuthContext } from './auth';

import favoritesService from '../services/product/favoritesService';

import alert from '../utils/alert';

export const FavoriteContext = createContext();

export const FavoriteContextProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const { currentUser } = useContext(AuthContext);

  const loadFavorites = useCallback(async (idUser) => {
    const result = await favoritesService.get(idUser);

    if (result.success) {
      setFavorites(result.data);
    } else {
      alert.errorToast('warning', result.message);
    }
  }, []);

  const handleAction = async (action, idUser) => {
    const result = await action();

    if (result.success) {
      await loadFavorites(idUser);
    } else {
      alert.errorToast('warning', result.message);
    }
  };

  const addFavorites = (idProduct) => {
    handleAction(
      () => favoritesService.add(currentUser.id, idProduct),
      currentUser.id
    );
  };

  const removeFavorites = (idProduct) => {
    handleAction(
      () => favoritesService.del(currentUser.id, idProduct),
      currentUser.id
    );
  };

  const isFavorite = useCallback(
    (idProduct) => favorites.some((item) => item.id === idProduct),
    [favorites]
  );

  useEffect(() => {
    if (!currentUser?.id) {
      setFavorites([]);
      return;
    }

    loadFavorites(currentUser.id);
  }, [currentUser?.id, loadFavorites]);

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
