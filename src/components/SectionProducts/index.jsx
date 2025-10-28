import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

import Button from '../Button';
import CardProduct from '../CardProduct';

import './styles.sass';

const SectionProducts = ({
  title,
  page,
  btnNext,
  btnBack,
  onNext,
  onBack,
  statusAPI,
}) => {
  return (
    <section className="products-grid">
      <h2>{title}</h2>
      <div className="products-grid-container">
        {statusAPI ? (
          <>
            <Button
              className={
                btnBack ? 'btn btn-directional' : 'btn btn-directional none'
              }
              text={<FaAngleLeft />}
              onClick={onBack}
              aria-label="Voltar para a página anterior"
            />
            {page.map((product) => (
              <CardProduct
                key={product?.id}
                idProduct={product?.id}
                className="home"
                tag={product?.tag}
                image={product?.image}
                category={product?.category}
                name={product?.name}
                price={product?.price}
              />
            ))}
            <Button
              className={
                btnNext ? 'btn btn-directional' : 'btn btn-directional none'
              }
              text={<FaAngleRight />}
              onClick={onNext}
              aria-label="Ir para a próxima página"
            />
          </>
        ) : (
          <div className="loader">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
        )}
      </div>
    </section>
  );
};

export default SectionProducts;
