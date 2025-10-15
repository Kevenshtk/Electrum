import { useEffect, useState } from 'react';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';

import Banner from '../../components/Banner';
import Button from '../../components/Button';
import Footer from '../../components/Footer';
import SectionProducts from '../../components/SectionProducts';
import Timer from '../../components/Timer';
import usePagination from '../../hooks/usePagination.js';
import useWindowWidth from '../../hooks/useWindowWidth.js';
import { api } from '../../services/api.js';

import './styles/main.sass';

const Home = ({ statusAPI }) => {
  const [products, setProducts] = useState([]);

  const width = useWindowWidth();

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

  const {
    page: viewProductsPromo,
    next: nextPromo,
    back: backPromo,
    hasPrev: btnBackPromo,
    hasNext: btnNextPromo,
  } = usePagination(products, 'promo', width <= 435 ? 1 : 4);

  const {
    page: viewProductsHot,
    next: nextHot,
    back: backHot,
    hasPrev: btnBackHot,
    hasNext: btnNextHot,
  } = usePagination(products, 'hot', width <= 435 ? 1 : 4);

  return (
    <>
      <section className="banners">
        <Banner id="banner-1" text="Promoção de Notebooks" category="Notebooks"/>
        <Banner id="banner-2" text="Lançamento de Acessórios" category="Acessórios" />
        <Banner id="banner-3" text="Câmeras Potentes" category="Câmeras" />
      </section>

      <SectionProducts
        title="Produtos em Promoção"
        page={viewProductsPromo}
        btnNext={btnNextPromo}
        btnBack={btnBackPromo}
        onNext={nextPromo}
        onBack={backPromo}
        statusAPI={statusAPI}
      />

      <section className="deal-container">
        <div className="deal-container-content">
          <Timer
            endDate={new Date(
              Date.now() + ((2 * 24 + 12) * 60 * 60 + 25 * 60 + 33) * 1000
            ).toISOString()}
          />
          <h2 className="deal-container-content-title">
            Promoção de Fone Gamer
          </h2>
          <p className="deal-container-content-subtitle">
            Toda a linha gamer com 50% de desconto
          </p>
          <button className="btn">Comprar Agora</button>
        </div>
      </section>

      <SectionProducts
        title="Mais Vendidos"
        page={viewProductsHot}
        btnNext={btnNextHot}
        btnBack={btnBackHot}
        onNext={nextHot}
        onBack={backHot}
        statusAPI={statusAPI}
      />

      <section className="newsletter-container">
        <h2>
          Assine a nossa <span>Newsletter</span>
        </h2>
        <form action="">
          <input
            type="email"
            placeholder="Digite o seu e-mail"
            required
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
