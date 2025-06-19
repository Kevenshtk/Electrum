import Header from '../../components/Header';
import Aside from '../../components/Aside';
import CardProduct from '../../components/CardProduct';

import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { api } from '../../services/api.js';

import './styles.sass';

const filterProductsByCategory = (products, category) => {
  const groups = {
    Periféricos: ['Monitores', 'Teclados', 'Mouses'],
  };

  if (groups[category]) {
    return products.filter((product) => groups[category].includes(product.category));
  }

  return products.filter((product) => product.category === category);
};

const ListProducts = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const dataProducts = async () => {
      try {
        const responce = await api.get('/products');
        const filteredProducts = filterProductsByCategory(responce.data, category)
        setProducts(filteredProducts);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };

    dataProducts();
  }, [category]);

  return (
    <>
      <Header />
      <div className="container">
        <Aside title={category} totalResult={products.length}/>
        <main className="containerList">
          {products.map((product) => {
            return (
              <CardProduct
                key={product?.id}
                className="list"
                tag={product?.tag}
                image={product?.image}
                category={product?.category}
                name={product?.name}
                price={product?.price}
              />
            );
          })}
        </main>
      </div>
    </>
  );
};

export default ListProducts;
