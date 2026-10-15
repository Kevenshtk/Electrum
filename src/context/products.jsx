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

  return (
    <ProductsContext.Provider value={{products, loadProducts}}>{children}</ProductsContext.Provider>
  );
};
