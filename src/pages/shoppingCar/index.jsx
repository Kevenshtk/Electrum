import { useContext } from 'react';
import CardHorizontal from '../../components/CardProduct/CardHorizontal';
import AsideShoppingCar from '../../components/Aside/AsideShoppingCar';
import Footer from '../../components/Footer';
import { ShoppingCartContext } from '../../context/shoppingCart';

import './styles.sass';

const ShoppingCar = () => {
  const { products } = useContext(ShoppingCartContext);

  return (
    <div className="cart">
      <main className="cart-content">
        <div className="cart-container">
          <h1 className="cart-title">Carrinho de Compras</h1>

          <div className="cart-layout">
            <div className="cart-items">
              {products.map((item) => {
                return (
                  <CardHorizontal
                    key={item.produto.id}
                    idProduct={item.produto.id}
                    image={item.produto.image}
                    category={item.produto.category}
                    name={item.produto.name}
                    price={item.produto.price}
                    qtd={item.quantidade}
                  />
                );
              })}
            </div>

            <AsideShoppingCar />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ShoppingCar;
