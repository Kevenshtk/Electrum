import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { AuthContext } from './auth';
import { cartService } from '../services/productService';
import Swal from 'sweetalert2';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3500,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  },
});

export const ShoppingCartContext = createContext();

export const ShoppingCartContextProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (!currentUser?.id) return;
    loadProducts(currentUser.id);
  }, [currentUser?.id]);

  useEffect(() => {
    totalPriceCart();
  }, [currentUser?.id, products]);

  const loadProducts = async (idUser) => {
    if (!idUser) return;

    const result = await cartService.get(idUser);

    if (result.success) {
      setProducts(result.data);
    } else {
      Toast.fire({
        icon: 'warning',
        title: result.message,
      });
    }
  };

  const addShoppingCart = useCallback(
    async (idProduct) => {
      if (!currentUser?.status) {
        Toast.fire({
          icon: 'warning',
          title: 'Realize o login para dar sequência ao seu pedido!',
        });

        return;
      }

      const result = await cartService.add(currentUser.id, idProduct);

      if (result.success) {
        Toast.fire({
          icon: 'success',
          title: 'Produto adicionado ao carrinho',
        });

        loadProducts(currentUser.id);
      } else {
        Toast.fire({
          icon: 'warning',
          title: result.message,
        });
      }
    },
    [currentUser]
  );

  const removeShoppingCart = useCallback(
    async (idProduct) => {
      const result = await cartService.del(currentUser.id, idProduct);

      if (result.success) {
        setProducts((prev) =>
          prev.filter((item) => item.produto.id !== idProduct)
        );
      } else {
        Toast.fire({
          icon: 'warning',
          title: result.message,
        });
      }
    },
    [currentUser]
  );

  const incrementQuant = async (idProduct) => {
    const result = await cartService.inc(currentUser.id, idProduct);

    if (result.success) {
      setProducts((prev) =>
        prev.map((item) =>
          item.produto.id === idProduct
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        )
      );
    }
  };

  const decrementQuant = async (idProduct) => {
    const result = await cartService.dec(currentUser.id, idProduct);

    result.status === 200 && loadProducts(currentUser.id);

    if (result.success) {
      setProducts((prev) =>
        prev.map((item) =>
          item.produto.id === idProduct
            ? { ...item, quantidade: item.quantidade - 1 } 
            : item
        )
      );
    }
  };

  const totalPriceCart = useCallback(async () => {
    const result = await cartService.total(currentUser.id);

    if (result.success) {
      setTotalPrice(result.data);
    } else {
      Toast.fire({
        icon: 'warning',
        title: result.message,
      });

      return 0;
    }
  }, [currentUser]);

  return (
    <ShoppingCartContext.Provider
      value={{
        products,
        addShoppingCart,
        removeShoppingCart,
        incrementQuant,
        decrementQuant,
        totalPrice,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};
