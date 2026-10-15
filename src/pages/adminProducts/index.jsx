import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";

import { FaPlus } from 'react-icons/fa';
import { LuPencil, LuTrash2 } from 'react-icons/lu';

import { ProductsContext } from '../../context/products.jsx';

import './styles.sass';

const AdminProducts = () => {
  const { products, loadProducts } = useContext(ProductsContext);

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div className="admin-products">
      <main className="admin-products-main">
        <section
          className="admin-products-panel"
          aria-labelledby="admin-products-title"
        >
          <h1 id="admin-products-title" className="admin-products-title">
            Produtos cadastrados
          </h1>
          <div className="admin-products-toolbar">
            <p className="admin-products-count">{products.length} produtos</p>
            <Link to="/products/register" className="admin-products-add">
              <FaPlus size={18} aria-hidden="true" />
              Adicionar produto
            </Link>
          </div>
          <div
            className="admin-products-table-container"
            tabIndex={0}
            role="region"
            aria-label="Lista de produtos cadastrados"
          >
            <table className="admin-products-table">
              <thead>
                <tr>
                  <th scope="col">Produto</th>
                  <th scope="col">Categoria</th>
                  <th scope="col">Preço</th>
                  <th scope="col">Quantidade</th>
                  <th scope="col">Tag</th>
                  <th scope="col">Ações</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                  <th scope="row">
                    <span className="admin-products-name">
                      {product.name}
                    </span>
                    <span className="admin-products-code">#{product.id}</span>
                  </th>
                  <td>{product.category}</td>
                  <td className="admin-products-price">R$ {product.price}</td>
                  <td>1</td>
                  <td>
                    <select
                      className="admin-products-tag"
                      aria-label={`Tag do ${product.name}`}
                      defaultValue={product.tag || ''}
                    >
                      <option value="new">New</option>
                      <option value="promo">Promo</option>
                      <option value="hot">Hot</option>
                      <option value="">Sem tag</option>
                    </select>
                  </td>
                  <td>
                    <div className="admin-products-actions">
                      <button
                        type="button"
                        className="admin-products-edit"
                        aria-label="Editar Monitor Gamer LG"
                        title="Editar produto"
                      >
                        <LuPencil size={17} aria-hidden="true" />
                      </button>
                      <button
                        type="button"
                        className="admin-products-delete"
                        aria-label="Excluir Monitor Gamer LG"
                        title="Excluir produto"
                      >
                        <LuTrash2 size={17} aria-hidden="true" />
                      </button>
                    </div>
                  </td>
                </tr>
                ))}
                
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminProducts;
