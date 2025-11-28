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
              {products.map((item, index) => {
                return (
                  <CardHorizontal
                    key={index}
                    image={item.image}
                    category={item.category}
                    name={item.name}
                    price={item.price}
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
