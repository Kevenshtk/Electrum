import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';

import AsideFilterProducts from '../../components/Aside/AsideFilterProducts';
import CardVertical from '../../components/CardProduct/CardVertical';
import { api } from '../../services/api.js';
import {
  filterProductsByCategory,
  filterProductsByTag,
} from '../../utils/filterProducts.js';
import { formatCategory } from '../../utils/textFormatter.js';

import './styles.sass';

const ListProducts = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [selectedTag, setSelectedTag] = useState('');
  const [viewProducts, setVeiwProducts] = useState([]);

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

  useEffect(() => {
    let productsFiltered = filterProductsByCategory(products, category);

    selectedTag &&
      (productsFiltered = filterProductsByTag(productsFiltered, selectedTag));

    setVeiwProducts(productsFiltered);
  }, [products, category, selectedTag]);

  const orderProductsByPrice = useCallback(
    (order) => {
      let productsOrdered = order.includes('menor')
        ? [...viewProducts].sort((a, b) => a.price - b.price)
        : [...viewProducts].sort((a, b) => b.price - a.price);

      setVeiwProducts(productsOrdered);
    },
    [viewProducts]
  );

  return (
    <div className="products-content">
      <div className="products-container">
        <div className="products-layout">
          <AsideFilterProducts
            title={formatCategory(category)}
            totalResult={viewProducts.length}
            onSelectedTag={setSelectedTag}
            onOrderProducts={orderProductsByPrice}
          />

          <main className="products-grid">
            {viewProducts.length !== 0 ? (
              viewProducts.map(({ id, tag, image, category, name, price }) => {
                return (
                  <CardVertical
                    key={id}
                    idProduct={id}
                    className="list"
                    tag={tag}
                    image={image}
                    category={category}
                    name={name}
                    price={price}
                  />
                );
              })
            ) : (
              <p>Nenhum produto encontrado para {category}.</p>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default ListProducts;
