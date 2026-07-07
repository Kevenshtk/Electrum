import Banner from '../../../components/Banner';

import './styles.sass';

const banners = [
  {
    id: 'banner-1',
    text: 'Promoção de Notebooks',
    category: 'notebook',
  },
  {
    id: 'banner-2',
    text: 'Lançamento de Acessórios',
    category: 'acessorio',
  },
  {
    id: 'banner-3',
    text: 'Câmeras Potentes',
    category: 'camera',
  },
];

const BannerSection = () => {
  return (
    <section className="banners">
      {banners.map((banner) => (
        <Banner
          key={banner.id}
          id={banner.id}
          text={banner.text}
          category={banner.category}
        />
      ))}
    </section>
  );
};

export default BannerSection;
