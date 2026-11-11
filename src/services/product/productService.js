import { api } from '../api.js';

const handleError = (error, defaultMessage) => ({
  success: false,
  message: error.response?.data?.message || defaultMessage,
});

const createProduct = async (data) => {
  try {
    const response = await api.post('/products', {
      name: data.name,
      category: data.category,
      description: data.description,
      price: parseFloat(data.price),
      image: data.image,
      tag: data.tag,
    });

    return { success: true, data: response.data };
  } catch (error) {
    return handleError(error, 'Erro ao criar um produto');
  }
};

const getProducts = async () => {
  try {
    const response = await api.get('/products');

    return { success: true, data: response.data };
  } catch (error) {
    return handleError(error, 'Erro ao buscar produtos, tente mais tarde!');
  }
};

const getProductsById = async (id) => {
  try {
    const response = await api.get('/products');
    
    if (!response.data) {
      throw new Error('Erro ao buscar produtos, tente mais tarde!');
    }

    const productData = response.data.find((p) => p.id === Number(id));

    if (!productData) {
      throw new Error();
    }

    return { success: true, data: productData };
  } catch (error) {
    return handleError(
      error,
      'Produto não encontrado!'
    );
  }
};

const updateProduct = async (id, data) => {
  try {
    await api.put(`/products/${id}`, {
      name: data.name,
      category: data.category,
      description: data.description,
      price: parseFloat(data.price),
      image: data.image,
      tag: data.tag,
    });

    return { success: true };
  } catch (error) {
    return handleError(error, 'Erro ao Atualizar produtos, tente mais tarde!');
  }
};

//const updateTagProduct = async () => {};

const deleteProduct = async (id) => {
  try {
    await api.delete(`/products/${id}`);

    return { success: true };
  } catch (error) {
    return handleError(error, 'Erro ao Atualizar produtos, tente mais tarde!');
  }
};

const productsService = {
  get: getProducts,
  getById: getProductsById,
  add: createProduct,
  uptProd: updateProduct,
  //uptTag: updateTagProduct,
  del: deleteProduct,
};

export default productsService;
