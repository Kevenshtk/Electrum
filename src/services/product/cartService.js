import { api } from '../api';

const cartService = {
  add: (idUser, idProduct) => addProductToShoppingCart(idUser, idProduct),
  get: (idUser) => getProductShoppingCart(idUser),
  del: (idUser, idProduct) => deleteProductShoppingCart(idUser, idProduct),
  inc: (idUser, idProduct) => incrementProductShoppingCart(idUser, idProduct),
  dec: (idUser, idProduct) => decrementProductShoppingCart(idUser, idProduct),
  total: (idUser) => getTotalShoppingCart(idUser),
};

const addProductToShoppingCart = async (idUser, idProduct) => {
  try {
    const { data } = await api.post(
      '/shopping-cart',
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

    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      message:
        error.response?.data?.message ||
        'Erro ao adicionar produto no carrinho',
      status: error.response?.status || 500,
    };
  }
};

const getProductShoppingCart = async (idUser) => {
  try {
    const { data } = await api.get(`/shopping-cart/user/${idUser}`);
    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Erro ao buscar produtos',
      status: error.response?.status || 500,
    };
  }
};

const deleteProductShoppingCart = async (idUser, idProduct) => {
  try {
    await api.delete(`/shopping-cart/user/${idUser}/product/${idProduct}`);

    return { success: true };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Erro ao remover o produto',
      status: error.response?.status || 500,
    };
  }
};

const incrementProductShoppingCart = async (idUser, idProduct) => {
  try {
    await api.put(
      `/shopping-cart/user/${idUser}/product/${idProduct}/increment`
    );
    return { success: true };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Erro no servidor',
      status: error.response?.status || 500,
    };
  }
};

const decrementProductShoppingCart = async (idUser, idProduct) => {
  try {
    const response = await api.put(
      `/shopping-cart/user/${idUser}/product/${idProduct}/decrement`
    );
    return { success: true, status: response.status };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Erro no servidor',
      status: error.response?.status || 500,
    };
  }
};

const getTotalShoppingCart = async (idUser) => {
  try {
    const response = await api.get(`/shopping-cart/user/${idUser}/total`);
    return { success: true, data: response.data.total };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Erro no servidor',
      status: error.response?.status || 500,
    };
  }
};

export default cartService;