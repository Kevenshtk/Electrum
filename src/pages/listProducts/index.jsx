import Header from '../../components/Header';
import Aside from '../../components/Aside';
import CardProduct from '../../components/CardProduct';

import { useParams } from 'react-router-dom';
import { useEffect, useState, useMemo } from 'react';

import { api } from '../../services/api.js';
import { filterProductsByCategory, filterProductsByTag } from '../../utils/filterProducts.js';
import { removeHyphen } from '../../utils/textFormatter.js';

import './styles.sass';

const ListProducts = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [selectedTag, setSelectedTag] = useState('');

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
    let productsFiltered = filterProductsByCategory(products, category);

    selectedTag && (productsFiltered = filterProductsByTag(productsFiltered, selectedTag))

    return productsFiltered;
  }, [products, category, selectedTag]);

  return (
    <>
      <Header />
      <div className="container">
        <Aside
          title={category.includes('-') ? removeHyphen(category) : category}
          totalResult={filteredProducts.length}
          onSelectedTag={setSelectedTag}
        />
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
