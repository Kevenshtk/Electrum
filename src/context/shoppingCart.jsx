import { createContext, useCallback, useContext } from 'react';
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
      } else {
        Toast.fire({
          icon: 'warning',
          title: result.message,
        });
      }
    },
    [currentUser]
  );

  return (
    <ShoppingCartContext.Provider value={{ addShoppingCart }}>
      {children}
    </ShoppingCartContext.Provider>
  );
};
