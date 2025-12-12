import './styles.sass';

const AsideFilterProducts = ({
  title,
  totalResult,
  onSelectedTag,
  onOrderProducts,
}) => {

  return (
      <aside className="products-sidebar">
        <h2 className="products-sidebar-title">{title}</h2>
        <p className="products-sidebar-count">{totalResult} resultados</p>

        <div className="products-sidebar-section">
          <h3 className="products-sidebar-label">Ordenar por:</h3>
          <div className="products-sidebar-options">
            <label className="products-sidebar-option">
              <input type="radio" name="order" onClick={() => onOrderProducts('maior')}/>
              <span>Maior preço</span>
            </label>
            <label className="products-sidebar-option">
              <input type="radio" name="order" onClick={() => onOrderProducts('menor')}/>
              <span>Menor preço</span>
            </label>
          </div>
        </div>

        <div className="products-sidebar-section">
          <h3 className="products-sidebar-label">Filtrar por tag:</h3>
          <div className="products-sidebar-tags">
            <label className="products-sidebar-tag">
              <input type="checkbox" onClick={() => onSelectedTag('promo')}/>
              <span>promo</span>
            </label>
            <label className="products-sidebar-tag">
              <input type="checkbox" onClick={() => onSelectedTag('hot')}/>
              <span>hot</span>
            </label>
            <label className="products-sidebar-tag">
              <input type="checkbox" onClick={() => onSelectedTag('new')}/>
              <span>new</span>
            </label>
          </div>
        </div>

        <button className="products-sidebar-clear" onClick={() => onSelectedTag('')}>Limpar Filtros</button>
      </aside>
  );
};

export default AsideFilterProducts;
