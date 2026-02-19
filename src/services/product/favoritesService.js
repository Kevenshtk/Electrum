import { api } from '../api';

const handleError = (error, defaultMessage) => ({
  success: false,
  message: error.response?.data?.message || defaultMessage,
});

const getProductsFavorites = async (idUser) => {
  try {
    const response = await api.get(`/favorites/user/${idUser}`);
    return { success: true, data: response.data };
  } catch (error) {
      return handleError(error, 'Erro ao buscar produtos favoritos');
  }
};

const addProductToFavorites = async (idUser, idProduct) => {
  try {
    const response = await api.post(
      '/favorites',
      {
        usuario: {
          id: idUser,
        },
        produto: {
          id: idProduct,
        },
      },
    );

    return { success: true, data: response.data };
  } catch (error) {
    return handleError(error, 'Erro ao adicionar produto aos favoritos');
  }
};

const deleteProductToFavorites = async (idUser, idProduct) => {
  try {
    await api.delete(`/favorites/user/${idUser}/product/${idProduct}`);

    return { success: true };
  } catch (error) {
    return handleError(error, 'Erro ao remover o produto');
  }
};

const favoritesService = {
  get: (idUser) => getProductsFavorites(idUser),
  add: (idUser, idProduct) => addProductToFavorites(idUser, idProduct),
  del: (idUser, idProduct) => deleteProductToFavorites(idUser, idProduct),
};

export default favoritesService;
