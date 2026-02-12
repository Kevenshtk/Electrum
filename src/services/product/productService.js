import { api } from '../api.js';

export const createProduct = async (productData) => {
  try {
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

    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      message:
        error.response?.data?.message || 'Erro ao tentar criar um produto',
      status: error.response?.status || 500,
    };
  }
};
