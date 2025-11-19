import CardHorizontal from "../../components/CardProduct/CardHorizontal";
import AsideShoppingCar from "../../components/Aside/AsideShoppingCar";
import Footer from '../../components/Footer';
import "./styles.sass";

const ShoppingCar = () => {
  return (
    <div className="cart">
      <main className="cart-content">
        <div className="cart-container">
          <h1 className="cart-title">Carrinho de Compras</h1>

          <div className="cart-layout">
            <div className="cart-items">
              <CardHorizontal />
              <CardHorizontal />
              <CardHorizontal />
            </div>

            <AsideShoppingCar/>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ShoppingCar;
