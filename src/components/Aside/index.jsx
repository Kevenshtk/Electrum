import Button from '../Button';
import { useState } from 'react';
import useWindowWidth from '../../hooks/useWindowWidth';

import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

import './styles.sass';

const Aside = ({ title, totalResult, onSelectedTag, onOrderProducts }) => {
  const [isOpen, setIsOpen] = useState(false);
  const width = useWindowWidth();

  const toggleAside = () => {
    setIsOpen(!isOpen);
  };

  return (
    <aside>
      <div className={isOpen ? 'asideListProducts show' : 'asideListProducts'}>
        <h3>{title}</h3>
        <span>{totalResult} resultados</span>
        <div>
          <span>Ordenar por:</span>
          <div className="containerFilterValue">
            {['Maior preço', 'Menor preço'].map((text, index) => {
              return <Button key={index} className="btn-filter" text={text} onClick={() => onOrderProducts(text)}/>;
            })}
          </div>
        </div>
        <div>
          <span>Filtar por tag:</span>
          <div className="containerFilterTags">
            {['promo', 'hot', 'new'].map((tag, index) => {
              return <Button key={index} className="btn-filter" text={tag} onClick={() => onSelectedTag(tag)}/>;
            })}
          </div>
        </div>
        <Button className="btn btn-clear" text="Limpar filtros" onClick={() => onSelectedTag('')}/>
      </div>

      {width <= 435 && (
        <Button
          className={'btn-show-hide-aside'}
          text={
            isOpen ? (
              <FaAngleLeft className="icon" />
            ) : (
              <FaAngleRight className="icon" />
            )
          }
          onClick={() => toggleAside()}
        />
      )}
    </aside>
  );
};

export default Aside;
