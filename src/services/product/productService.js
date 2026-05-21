import { api } from '../api.js';

const createProduct = async (productData) => {
  try {
    const response = await api.post('/products', {
      name: productData.name,
      category: productData.category,
      description: productData.description,
      price: parseFloat(productData.price),
      image: productData.image,
      tag: productData.tag,
    });

    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      message:
        error.response?.data?.message || 'Erro ao tentar criar um produto',
    };
  }
};

const getProducts = async () => {
  try {
    const response = await api.get('/products');

    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Erro ao buscar produtos',
    };
  }
};

const productsService = {
  get: getProducts,
  add: createProduct,
};


export default productsService;
