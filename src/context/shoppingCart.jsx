import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  useMemo,
} from 'react';

import { AuthContext } from './auth';

import cartService from '../services/product/cartService';

import alert from '../utils/alert';

export const ShoppingCartContext = createContext();

export const ShoppingCartContextProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  const [products, setProducts] = useState([]);

  const loadProducts = useCallback(async (idUser) => {
    if (!idUser) return;

    const result = await cartService.get(idUser);

    if (result.success) {
      setProducts(result.data);
    } else {
      alert.errorToast('warning', result.message);
    }
  }, []);

  const handleActionAddRem = useCallback(
    async (action, idUser, msgSuccess) => {
      const result = await action();

      if (result.success) {
        if (msgSuccess) alert.successToast(msgSuccess);
        loadProducts(idUser);
      } else {
        alert.errorToast('warning', result.message);
      }
    },
    [loadProducts]
  );

  const handleActionIncDec = useCallback(
    async (action, idProduct, idUser, operation) => {
      const result = await action();

      if (result.success) {
        if (operation === 'dec') {
          loadProducts(idUser);

          setProducts((prev) =>
            prev.map((item) =>
              item.produto.id === idProduct
                ? { ...item, quantidade: item.quantidade - 1 }
                : item
            )
          );
        } else {
          setProducts((prev) =>
            prev.map((item) =>
              item.produto.id === idProduct
                ? { ...item, quantidade: item.quantidade + 1 }
                : item
            )
          );
        }
      } else {
        alert.errorToast('warning', result.message);
      }
    },
    [loadProducts]
  );

  const addShoppingCart = useCallback(
    (idProduct) => {
      if (!currentUser?.status) {
        alert.errorToast(
          'warning',
          'Realize o login para dar sequência ao seu pedido!'
        );
        return;
      }

      handleActionAddRem(
        () => cartService.add(currentUser.id, idProduct),
        currentUser.id,
        'Produto adicionado ao carrinho'
      );
    },
    [currentUser.id, currentUser.status, handleActionAddRem]
  );

  const removeShoppingCart = useCallback(
    (idProduct) => {
      handleActionAddRem(
        () => cartService.del(currentUser.id, idProduct),
        currentUser.id
      );
    },
    [currentUser.id, handleActionAddRem]
  );

  const incrementQuant = (idProduct) => {
    handleActionIncDec(
      () => cartService.inc(currentUser.id, idProduct),
      idProduct,
      currentUser.id,
      'inc'
    );
  };

  const decrementQuant = (idProduct) => {
    handleActionIncDec(
      () => cartService.dec(currentUser.id, idProduct),
      idProduct,
      currentUser.id,
      'dec'
    );
  };

  const subTotalPriceCart = useMemo(() => {
    return products.reduce(
      (total, item) => total + item.produto.price * item.quantidade,
      0
    );
  }, [products]);

  const totalPrice = useMemo(() => {
    if (subTotalPriceCart < 500) {
      return subTotalPriceCart + 50;
    }

    return subTotalPriceCart;
  }, [subTotalPriceCart]);

  const finalizeOrder = () => {
    alert.unavailable();
  };

  useEffect(() => {
    if (!currentUser?.id) {
      setProducts([]);
      return;
    }

    loadProducts(currentUser.id);
  }, [currentUser?.id, loadProducts]);

  return (
    <ShoppingCartContext.Provider
      value={{
        products,
        addShoppingCart,
        removeShoppingCart,
        incrementQuant,
        decrementQuant,
        finalizeOrder,
        subTotalPriceCart,
        totalPrice,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};
