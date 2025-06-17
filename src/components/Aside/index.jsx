import Button from '../Button';
import { useState } from 'react';
import useWindowWidth from '../../hooks/useWindowWidth';

import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

import './styles.sass';

const Aside = ({ title, totalResult }) => {
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
            {['maior preço', 'menor preço'].map((text, index) => {
              return <Button key={index} className="btn-filter" text={text} />;
            })}
          </div>
        </div>
        <div>
          <span>Filtar por tag:</span>
          <div className="containerFilterTags">
            {['promo', 'hot', 'new'].map((tag, index) => {
              return <Button key={index} className="btn-filter" text={tag} />;
            })}
          </div>
        </div>
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
