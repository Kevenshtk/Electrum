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

  useEffect(() => {
    if (!currentUser?.id) return;
    loadProducts(currentUser.id);
  }, [currentUser?.id]);

  const loadProducts = async (idUser) => {
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

        setProducts((prev) => [...prev, result.data]);
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
        setProducts((prev) => prev.filter((item) => item.produto.id !== idProduct));
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
    await cartService.inc(currentUser.id, idProduct);
  };

  const decrementQuant = async (idProduct) => {
    const { status } = await cartService.dec(currentUser.id, idProduct);

    status === 200 && loadProducts(currentUser.id);
  };

  return (
    <ShoppingCartContext.Provider value={{ products, addShoppingCart, removeShoppingCart, incrementQuant, decrementQuant }}>
      {children}
    </ShoppingCartContext.Provider>
  );
};
