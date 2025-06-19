import Header from '../../components/Header';
import Aside from '../../components/Aside';
import CardProduct from '../../components/CardProduct';

import { useParams } from 'react-router-dom';
import { useEffect, useState, useMemo } from 'react';

import { api } from '../../services/api.js';
import { filterProductsByCategory } from '../../utils/filterProducts.js';

import './styles.sass';

const ListProducts = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };

    fetchProducts();
  }, [category]);

  const filteredProducts = useMemo(() => {
    return filterProductsByCategory(products, category);
  }, [products, category]);

  return (
    <>
      <Header />
      <div className="container">
        <Aside title={category} totalResult={products.length} />
        <main className="containerList">
          {filteredProducts.length !== 0 ? (
            filteredProducts.map(
              ({ id, tag, image, category, name, price }) => {
                return (
                  <CardProduct
                    key={id}
                    className="list"
                    tag={tag}
                    image={image}
                    category={category}
                    name={name}
                    price={price}
                  />
                );
              }
            )
          ) : (
            <p>Nenhum produto encontrado para {category}.</p>
          )}
        </main>
      </div>
    </>
  );
};

export default ListProducts;
