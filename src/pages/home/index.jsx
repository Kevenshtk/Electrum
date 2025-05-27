import Header from '../../components/Header';
import Banner from '../../components/Banner';
import CardProduct from '../../components/CardProduct';
import Button from '../../components/Button';
import Timer from '../../components/Timer';
import Footer from '../../components/Footer';

import { api } from '../../services/api.js';
import { useEffect, useState, useMemo } from 'react';

import './styles/main.sass';

import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaAngleLeft,
  FaAngleRight,
} from 'react-icons/fa';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [viewProductsNew, setViewProductsNew] = useState([]);
  const [viewProductsHot, setViewProductsHot] = useState([]);

  const [btnNextPromo, setBtnNextPromo] = useState(true);
  const [btnBackPromo, setBtnBackPromo] = useState(false);
  const [btnNextHot, setBtnNextHot] = useState(true);
  const [btnBackHot, setBtnBackHot] = useState(false);

  const [offsetNewProducts, setOffsetNewProducts] = useState(0);
  const [limitNewProducts, setLimitNewProducts] = useState(3);
  const [offsetHotProducts, setOffsetHotProducts] = useState(0);
  const [limitHotProducts, setLimitHotProducts] = useState(3);

  useEffect(() => {
    const dataProducts = async () => {
      try {
        const response = await api.get('/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };

    dataProducts();
  }, []);

  const allNewProducts = useMemo(() => {
    return products.filter((product) => product.tag === 'new');
  }, [products]);

  const allHotProducts = useMemo(() => {
    return products.filter((product) => product.tag === 'hot');
  }, [products]);

  useEffect(() => {
    setViewProductsNew(
      allNewProducts.filter((product, index) => {
        return index >= offsetNewProducts && index <= limitNewProducts;
      })
    );
  }, [products, offsetNewProducts, limitNewProducts]);

  useEffect(() => {
    setViewProductsHot(
      allHotProducts.filter((product, index) => {
        return index >= offsetHotProducts && index <= limitHotProducts;
      })
    );
  }, [products, offsetHotProducts, limitHotProducts]);

  const btnClickNext = (section) => {
    switch (section) {
      case 'new':
        setOffsetNewProducts((prev) => prev + 1);
        setLimitNewProducts((prev) => prev + 1);
        setBtnBackPromo(true);
        limitNewProducts === allNewProducts.length - 2 && setBtnNextPromo(false);
        break;
      case 'hot':
        setOffsetHotProducts((prev) => prev + 1);
        setLimitHotProducts((prev) => prev + 1);
        setBtnBackHot(true);
        limitHotProducts === allHotProducts.length - 2 && setBtnNextHot(false);
        break;
    }
  };

  const btnClickBack = (section) => {
    switch (section) {
      case 'new':
        setOffsetNewProducts((prev) => prev - 1);
        setLimitNewProducts((prev) => prev - 1);
        setBtnNextPromo(true);
        offsetNewProducts === 1 && setBtnBackPromo(false);
        break;
      case 'hot':
        setOffsetHotProducts((prev) => prev - 1);
        setLimitHotProducts((prev) => prev - 1);
        setBtnNextHot(true);
        offsetHotProducts === 1 && setBtnBackHot(false);
        break;
    }
  };

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
          <Button
            className={
              btnBackPromo ? 'btn btn-directional' : 'btn btn-directional none'
            }
            text={<FaAngleLeft />}
            onClick={() => btnClickBack('new')}
          />
          {viewProductsNew.map((product, index) => (
            <CardProduct
              key={index}
              tag={product?.tag}
              image={product?.image}
              category={product?.category}
              name={product?.name}
              price={product?.price}
            />
          ))}
          <Button
            className={
              btnNextPromo ? 'btn btn-directional' : 'btn btn-directional none'
            }
            text={<FaAngleRight />}
            onClick={() => btnClickNext('new')}
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
          <Button
            className={
              btnBackHot ? 'btn btn-directional' : 'btn btn-directional none'
            }
            text={<FaAngleLeft />}
            onClick={() => btnClickBack('hot')}
          />
          {viewProductsHot.map((product, index) => (
            <CardProduct
              key={index}
              tag={product?.tag}
              image={product?.image}
              category={product?.category}
              name={product?.name}
              price={product?.price}
            />
          ))}
          <Button
            className={
              btnNextHot ? 'btn btn-directional' : 'btn btn-directional none'
            }
            text={<FaAngleRight />}
            onClick={() => btnClickNext('hot')}
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
          <Button type="submit" className="btn btn-half" text="Assinar" />
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
