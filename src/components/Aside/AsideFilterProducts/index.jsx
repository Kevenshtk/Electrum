import Button from '../../Button';

import './styles.sass';

const AsideFilterProducts = ({
  title,
  totalResult,
  onSelectedTag,
  onOrderProducts,
}) => {

  const clearFilters = () => {
    onSelectedTag('');
    onOrderProducts('');
  };

  return (
    <aside className="products-sidebar">
      <h2 className="products-sidebar-title">{title}</h2>
      <p className="products-sidebar-count">{totalResult} resultados</p>

      <div className="products-sidebar-section">
        <h3 className="products-sidebar-label">Ordenar por:</h3>
        <div className="products-sidebar-options">
            <Button className='btn-filter' text={'Maior preço'} onClick={() => onOrderProducts('maior')}/>
            <Button className='btn-filter' text={'Menor preço'} onClick={() => onOrderProducts('menor')}/>
        </div>
      </div>

      <div className="products-sidebar-section">
        <h3 className="products-sidebar-label">Filtrar por tag:</h3>
        <div className="products-sidebar-tags">
          <Button className='btn-filter' text={'promo'} onClick={() => onSelectedTag('promo')}/>
          <Button className='btn-filter' text={'hot'} onClick={() => onSelectedTag('hot')}/>
          <Button className='btn-filter' text={'new'} onClick={() => onSelectedTag('new')}/>
        </div>
      </div>

      <button className="products-sidebar-clear" onClick={() => clearFilters()}>
        Limpar Filtros
      </button>
    </aside>
  );
};

export default AsideFilterProducts;
