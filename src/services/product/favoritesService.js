import { api } from '../api';

const favoritesService = {
  get: (idUser) => getProductsFavorites(idUser),
  add: (idUser, idProduct) => addProductToFavorites(idUser, idProduct),
  del: (idUser, idProduct) => deleteProductToFavorites(idUser, idProduct),
};

const getProductsFavorites = async (idUser) => {
  try {
    const response = await api.get(`/favorites/user/${idUser}`);
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      message:
        error.response?.data?.message || 'Erro ao buscar produtos favoritos',
      status: error.response?.status || 500,
    };
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
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      message:
        error.response?.data?.message ||
        'Erro ao adicionar produto aos favoritos',
      status: error.response?.status || 500,
    };
  }
};

const deleteProductToFavorites = async (idUser, idProduct) => {
  try {
    await api.delete(`/favorites/user/${idUser}/product/${idProduct}`);

    return { success: true };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Erro ao remover o produto',
      status: error.response?.status || 500,
    };
  }
};

export default favoritesService;
