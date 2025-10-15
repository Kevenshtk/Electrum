import { api } from './api.js';

export const createProduct = async (productData) => {
  const response = await api.post(
    '/products',
    {
      name: productData.name,
      category: productData.category,
      description: productData.description,
      price: parseFloat(productData.price),
      image: productData.image,
      tag: productData.tag,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  return response.data;
};

export const getProductsById = async (idProduct) => {
  try {
    const response = await api.get(`/products/${idProduct}`);
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Erro ao buscar produto',
    };
  }
};

export const addProductToFavorites = async (idUser, idProduct) => {
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

export const deleteProductToFavorites = async (idUser, idProduct) => {
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

export const getProductsFavorites = async (idUser) => {
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
