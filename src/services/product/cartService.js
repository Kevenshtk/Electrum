import { api } from '../api';

const handleError = (error, defaultMessage) => ({
  success: false,
  message: error.response?.data?.message || defaultMessage,
});

const addProductToShoppingCart = async (idUser, idProduct) => {
  try {
    const { data } = await api.post('/shopping-cart', {
      usuario: {
        id: idUser,
      },
      produto: {
        id: idProduct,
      },
    });

    return { success: true, data };
  } catch (error) {
    return handleError(error, 'Erro ao adicionar produto no carrinho');
  }
};

const getProductShoppingCart = async (idUser) => {
  try {
    const { data } = await api.get(`/shopping-cart/user/${idUser}`);
    return { success: true, data };
  } catch (error) {
    return handleError(error, 'Erro ao buscar produtos');
  }
};

const deleteProductShoppingCart = async (idUser, idProduct) => {
  try {
    await api.delete(`/shopping-cart/user/${idUser}/product/${idProduct}`);

    return { success: true };
  } catch (error) {
    return handleError(error, 'Erro ao remover o produto');
  }
};

const incrementProductShoppingCart = async (idUser, idProduct) => {
  try {
    await api.put(
      `/shopping-cart/user/${idUser}/product/${idProduct}/increment`
    );
    return { success: true };
  } catch (error) {
    return handleError(error, 'Erro ao incrementar a quantidade do produto');
  }
};

const decrementProductShoppingCart = async (idUser, idProduct) => {
  try {
    const response = await api.put(
      `/shopping-cart/user/${idUser}/product/${idProduct}/decrement`
    );
    return { success: true, status: response.status };
  } catch (error) {
    return handleError(error, 'Erro ao decrementar a quantidade do produto');
  }
};

const getTotalShoppingCart = async (idUser) => {
  try {
    const response = await api.get(`/shopping-cart/user/${idUser}/total`);
    return { success: true, data: response.data.total };
  } catch (error) {
    return handleError(error, 'Erro ao calcular o total do carrinho');
  }
};

const cartService = {
  add: (idUser, idProduct) => addProductToShoppingCart(idUser, idProduct),
  get: (idUser) => getProductShoppingCart(idUser),
  del: (idUser, idProduct) => deleteProductShoppingCart(idUser, idProduct),
  inc: (idUser, idProduct) => incrementProductShoppingCart(idUser, idProduct),
  dec: (idUser, idProduct) => decrementProductShoppingCart(idUser, idProduct),
  total: (idUser) => getTotalShoppingCart(idUser),
};

export default cartService;
