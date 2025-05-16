import Header from "../../components/Header";
import Banner from "../../components/Banner";
import CardProduct from "../../components/CardProduct";
import Button from "../../components/Button";
import Timer from "../../components/Timer";
import Footer from "../../components/Footer";

import "./styles/main.sass";

import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

const Home = () => {
  return (
    <>
      <Header />

      <section className="banners">
        <Banner id="banner-1" text="Promoção de Notebooks" />
        <Banner id="banner-2" text="Lançamento de Acessórios" />
        <Banner id="banner-3" text="Câmeras Potentes" />
      </section>

      <section className="products-grid">
        <h2>Produtos Novos</h2>
        <div className="products-grid-container">
          <CardProduct
            preco="124,90"
            categoria="categoria"
            nome="Nome Produto"
            tag="new"
          />
          <CardProduct
            preco="124,90"
            categoria="categoria"
            nome="Nome Produto"
            tag="new"
          />
          <CardProduct
            preco="124,90"
            categoria="categoria"
            nome="Nome Produto"
            tag="new"
          />
          <CardProduct
            preco="124,90"
            categoria="categoria"
            nome="Nome Produto"
            tag="new"
          />
        </div>
      </section>

      <section className="deal-container">
        <div className="deal-container-content">
          <Timer />
          <h2 className="deal-container-content-title">
            Promoção de Fone Gamer
          </h2>
          <p className="deal-container-content-subtitle">
            Toda a linha gamer com 50% de desconto
          </p>
          <button className="btn">Comprar Agora</button>
        </div>
      </section>

      <section className="products-grid">
        <h2>Mais Vendidos</h2>
        <div className="products-grid-container">
          <CardProduct
            preco="124,90"
            categoria="categoria"
            nome="Nome Produto"
            tag="hot"
          />
          <CardProduct
            preco="124,90"
            categoria="categoria"
            nome="Nome Produto"
            tag="hot"
          />
          <CardProduct
            preco="124,90"
            categoria="categoria"
            nome="Nome Produto"
            tag="hot"
          />
          <CardProduct
            preco="124,90"
            categoria="categoria"
            nome="Nome Produto"
            tag="hot"
          />
        </div>
      </section>

      <section className="newsletter-container">
        <h2>
          Assine a nossa <span>Newsletter</span>
        </h2>
        <form action="">
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Digite o seu e-mail"
          />
          <Button type="submit" style="btn btn-half" text="Assinar" />
        </form>
        <div className="social-media">
          <FaFacebookF className="icon" />
          <FaInstagram className="icon" />
          <FaTwitter className="icon" />
        </div>
      </section>

      <Footer />
    </>
  );
};

export { Home };
