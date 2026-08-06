import { useEffect, useState, useCallback } from 'react';

import { useParams } from 'react-router-dom';

import productsService from '../../services/product/productService.js';

import alert from '../../utils/alert';

import {
  filterProductsByCategory,
  filterProductsByTag,
} from '../../utils/filterProducts.js';
import { formatCategory } from '../../utils/textFormatter.js';

import AsideFilterProducts from '../../components/Aside/AsideFilterProducts';
import { CardVertical } from '../../components/CardProduct';
import { Loader } from '../../components/Loader';

import './styles.sass';

const ListProducts = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedTag, setSelectedTag] = useState('');
  const [viewProducts, setViewProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const result = await productsService.get();

      if (!result.success) {
        setError(true);
        setProducts([]);
        setLoading(false);
        alert.errorToast('error', result.message);
        return;
      }

      setProducts(result.data);
      setLoading(false);
    };

    fetchProducts();
  }, [category]);

  useEffect(() => {
    let productsFiltered = filterProductsByCategory(products, category);

    selectedTag &&
      (productsFiltered = filterProductsByTag(productsFiltered, selectedTag));

    setViewProducts(productsFiltered);
  }, [products, category, selectedTag]);

  const orderProductsByPrice = useCallback(
    (order) => {
      let productsOrdered;

      if (order.includes('menor')) {
        productsOrdered = [...viewProducts].sort((a, b) => a.price - b.price);
      } else if (order.includes('maior')) {
        productsOrdered = [...viewProducts].sort((a, b) => b.price - a.price);
      } else {
        productsOrdered = filterProductsByCategory(products, category);
      }

      setViewProducts(productsOrdered);
    },
    [viewProducts, products, category]
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
            {loading ? (
              <Loader />
            ) : viewProducts.length > 0 ? (
              viewProducts.map(({ id, tag, image, category, name, price }) => (
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
              ))
            ) : error ? (
              <p>Não foi possível carregar os produtos.</p>
            ) : (
              <p>Nenhum produto encontrado para {formatCategory(category)}.</p>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default ListProducts;
