import { useContext } from 'react';

import { FavoriteContext } from '../../context/favorites';

import CardVertical from '../../components/CardProduct/CardVertical';
import Footer from '../../components/Footer';

import './styles.sass';

const Favorites = () => {
  const { favorites } = useContext(FavoriteContext);

  return (
    <div className="favorites">
      <main className="favorites-content">
        <div className="favorites-container">
          <h1 className="favorites-title">Meus Favoritos</h1>

          <div className="favorites-grid">
            {favorites.map((item) => (
              <CardVertical
                key={item?.id}
                idProduct={item?.id}
                className="favorite"
                tag={item?.tag}
                image={item?.image}
                category={item?.category}
                name={item?.name}
                price={item?.price}
              />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Favorites;
