import Button from "../Button";
import "./styles.sass";

const CardProduct = ({ preco, categoria, nome, tag }) => {
  return (
    <div className="products-grid-card">
      <span className={`label ${tag}`}>{tag}</span>
      <img src="img/prod-1.jpg" alt="Produto 1" />
      <p className="category">{categoria}</p>
      <h3 className="product-name">{nome}</h3>
      <p className="product-price">R$ {preco}</p>
      <div className="rating-box">
        <i className="fas fa-star"></i>
        <i className="fas fa-star"></i>
        <i className="fas fa-star"></i>
        <i className="fas fa-star"></i>
        <i className="fas fa-star"></i>
      </div>
      <Button style="btn" text="Comprar" />
    </div>
  );
};

export default CardProduct;
