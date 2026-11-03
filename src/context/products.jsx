import { createContext, useState } from 'react';

import productsService from '../services/product/productService.js';

import alert from '../utils/alert.js';

export const ProductsContext = createContext();

export const ProductsContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  const loadProducts = async () => {
    const result = await productsService.get();

    if (result.success) {
      setProducts(result.data);
    } else {
      alert.errorToast('warning', result.message);
    }
  };

  const addProduct = async (data) => {
    const result = await productsService.add(data);

    if(result.success){
      alert.successToast("Produto cadastrado com sucesso!");
      return true;
    } else {
      alert.error('info', result.message, 'Tente novamente mais tarde.');
      return false;
    }
  }

  return (
    <ProductsContext.Provider value={{products, loadProducts, addProduct}}>{children}</ProductsContext.Provider>
  );
};
