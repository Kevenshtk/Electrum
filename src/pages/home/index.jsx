import { useEffect, useContext } from 'react';

import { ProductsContext } from '../../context/products.jsx'

import useWindowWidth from '../../hooks/useWindowWidth.js';
import usePagination from '../../hooks/usePagination.js';

import BannerSection from './BannerSection';
import ProductsSection from './ProductsSection';
import DealSection from './DealSection';
import Newsletter from './Newsletter';

import Footer from '../../layout/Footer';


const Home = ({ statusAPI }) => {
  const { loadProducts, products } = useContext(ProductsContext);

  const width = useWindowWidth();

  useEffect(() => {
    const fetchProducts = async () => {
      await loadProducts();
    };

    fetchProducts();
  }, [loadProducts]);

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
      <BannerSection />

      <ProductsSection
        title="Produtos em Promoção"
        page={viewProductsPromo}
        btnNext={btnNextPromo}
        btnBack={btnBackPromo}
        onNext={nextPromo}
        onBack={backPromo}
        statusAPI={statusAPI}
      />

      <DealSection />

      <ProductsSection
        title="Mais Vendidos"
        page={viewProductsHot}
        btnNext={btnNextHot}
        btnBack={btnBackHot}
        onNext={nextHot}
        onBack={backHot}
        statusAPI={statusAPI}
      />

      <Newsletter/>

      <Footer />
    </>
  );
};

export default Home;
