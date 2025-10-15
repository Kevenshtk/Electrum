import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';

import Aside from '../../components/Aside';
import CardProduct from '../../components/CardProduct';
import { api } from '../../services/api.js';
import {
  filterProductsByCategory,
  filterProductsByTag,
} from '../../utils/filterProducts.js';
import { removeHyphen } from '../../utils/textFormatter.js';

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

  const orderProductsByPrice = useCallback((order) => {
    let productsOrdered = order.includes('Menor')
      ? [...viewProducts].sort((a, b) => a.price - b.price)
      : [...viewProducts].sort((a, b) => b.price - a.price);

    setVeiwProducts(productsOrdered);
  }, [viewProducts]);

  return (
    <>
      <div className="container">
        <Aside
          title={category.includes('-') ? removeHyphen(category) : category}
          totalResult={viewProducts.length}
          onSelectedTag={setSelectedTag}
          onOrderProducts={orderProductsByPrice}
        />
        <main className="containerList">
          {viewProducts.length !== 0 ? (
            viewProducts.map(({ id, tag, image, category, name, price }) => {
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
            })
          ) : (
            <p>Nenhum produto encontrado para {category}.</p>
          )}
        </main>
      </div>
    </>
  );
};

export default ListProducts;
