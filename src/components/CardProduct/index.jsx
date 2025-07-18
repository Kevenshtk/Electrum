import Button from '../Button';

import { removeHyphen } from '../../utils/textFormatter.js';

import './styles.sass';

const CardProduct = ({ className, tag, image, category, name, price }) => {
  return (
    <div className={`products-grid-card-${className}`}>
      <span className={`label ${tag}`}>{tag}</span>
      <img src={image} alt={name} />
      <p className="category">
        {category.includes('-') ? removeHyphen(category) : category}
      </p>
      <h3 className="product-name">{name}</h3>
      <p className="product-price">R$ {price}</p>
      <div className="rating-box">
        <i className="fas fa-star"></i>
        <i className="fas fa-star"></i>
        <i className="fas fa-star"></i>
        <i className="fas fa-star"></i>
        <i className="fas fa-star"></i>
      </div>
      <Button className="btn" text="Comprar" />
    </div>
  );
};

export default CardProduct;
