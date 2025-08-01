import Header from '../../components/Header';
import Banner from '../../components/Banner';
import SectionProducts from '../../components/SectionProducts';
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import UserForm from '../../components/Forms/UserForm';
import Timer from '../../components/Timer';
import Footer from '../../components/Footer';

import { api } from '../../services/api.js';
import { useEffect, useState } from 'react';
import usePagination from '../../hooks/usePagination.js';
import useWindowWidth from '../../hooks/useWindowWidth.js';

import './styles/main.sass';

import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';

const Home = ({ currentUser, setCurrentUser }) => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isFormRegister, setIsFormRegister] = useState(false);

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
      <Header
        currentUser={currentUser}
        setShowModal={setShowModal}
        setIsFormRegister={setIsFormRegister}
      />
      {showModal && (
        <Modal setShowModal={setShowModal}>
          <UserForm
            setCurrentUser={setCurrentUser}
            setShowModal={setShowModal}
            isFormRegister={isFormRegister}
          />
        </Modal>
      )}

      <section className="banners">
        <Banner id="banner-1" text="Promoção de Notebooks" />
        <Banner id="banner-2" text="Lançamento de Acessórios" />
        <Banner id="banner-3" text="Câmeras Potentes" />
      </section>

      <SectionProducts
        title="Produtos em Promoção"
        page={viewProductsPromo}
        btnNext={btnNextPromo}
        btnBack={btnBackPromo}
        onNext={nextPromo}
        onBack={backPromo}
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
