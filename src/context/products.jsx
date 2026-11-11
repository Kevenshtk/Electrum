import { createContext, useState, useCallback } from 'react';

import productsService from '../services/product/productService.js';

import alert from '../utils/alert.js';

export const ProductsContext = createContext();

export const ProductsContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorLoad, setErrorLoad] = useState(false);

  const loadProducts = async () => {
    setLoading(true);
    setErrorLoad(false);

    const result = await productsService.get();

    if (result.success) {
      setProducts(result.data);
    } else {
      alert.errorToast('warning', result.message);
      setErrorLoad(true);
    }

    setLoading(false);
  };

  const loadProduct = useCallback(async (id) => {
    const result = await productsService.getById(id);

    if (!result.success) {
      alert.errorToast('warning', result.message);
      return { success: false };
    }

    return {
      success: true,
      data: result.data,
    };
  }, []);

  const addProduct = async (data) => {
    const result = await productsService.add(data);

    if (result.success) {
      alert.successToast('Produto cadastrado com sucesso!');
      return true;
    } else {
      alert.error('info', result.message, 'Tente novamente mais tarde.');
      return false;
    }
  };

  const uptProduct = async (id, data) => {
    const result = await productsService.uptProd(id, data);

    if (result.success) {
      alert.successToast('Produto Atualizado com sucesso!');
      return true;
    } else {
      alert.error('info', result.message, 'Tente novamente mais tarde.');
      return false;
    }
  };

  const delProduct = async (id) => {
    const result = await productsService.del(id);

    if (result.success) {
      alert.successToast('Produto deletado com sucesso!');
    } else {
      alert.error('info', result.message, 'Tente novamente mais tarde.');
    }
  };

  return (
    <ProductsContext.Provider
      value={{
        products,
        loading,
        errorLoad,
        loadProducts,
        loadProduct,
        addProduct,
        uptProduct,
        delProduct,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
