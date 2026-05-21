import { useEffect, useState } from 'react';

import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';

import productsService from '../../services/product/productService.js';

import useWindowWidth from '../../hooks/useWindowWidth.js';
import usePagination from '../../hooks/usePagination.js';
import alert from '../../utils/alert.js';

import Banner from '../../components/Banner';
import SectionProducts from '../../layout/SectionProducts';
import Timer from '../../components/Timer';
import Button from '../../components/Button';
import Footer from '../../layout/Footer';

import './styles/main.sass';

const Home = ({ statusAPI }) => {
  const [products, setProducts] = useState([]);

  const width = useWindowWidth();

  useEffect(() => {
    const fetchProducts = async () => {
      const result = await productsService.get();

      if (!result.success) {
        alert.errorToast('error', result.message);
        return;
      }

      setProducts(result.data);
    };

    fetchProducts();
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
        <Banner
          id="banner-1"
          text="Promoção de Notebooks"
          category="notebook"
        />
        <Banner
          id="banner-2"
          text="Lançamento de Acessórios"
          category="acessorio"
        />
        <Banner id="banner-3" text="Câmeras Potentes" category="camera" />
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
          <button className="btn" onClick={alert.unavailable}>
            Comprar Agora
          </button>
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
        <div>
          <input type="email" placeholder="Digite o seu e-mail" required />
          <Button
            className="btn btn-half"
            text="Assinar"
            onClick={alert.unavailable}
          />
        </div>
        <div className="social-media">
          <a
            href="https://www.facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebookF className="icon" />
          </a>
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram className="icon" />
          </a>
          <a href="https://x.com/" target="_blank" rel="noopener noreferrer">
            <FaTwitter className="icon" />
          </a>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Home;
