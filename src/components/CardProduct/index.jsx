import { useContext, useEffect, useState } from 'react';
import { FaHeart, FaRegHeart  } from "react-icons/fa";
import Swal from 'sweetalert2';

import { AuthContext } from '../../context/auth.jsx';
import {
  addProductToFavorites,
  deleteProductToFavorites,
  validateProductFavorites,
} from '../../services/productService.js';
import { removeHyphen } from '../../utils/textFormatter.js';
import Button from '../Button';

import './styles.sass';

const CardProduct = ({
  idProduct,
  className,
  tag,
  image,
  category,
  name,
  price,
}) => {
  const { currentUser } = useContext(AuthContext);
  const [isFavorite, setIsFavorite] = useState(false);

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3500,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });

  const addFavorites = async (idUser, idProduct) => {
    const result = await addProductToFavorites(idUser, idProduct);

    if (result.success) {
      setIsFavorite(true);
    } else {
      Toast.fire({
        icon: 'warning',
        title: result.message,
      });
    }
  };

  const removeFavorites = async (idUser, idProduct) => {
    const result = await deleteProductToFavorites(idUser, idProduct);

    if (result.success) {
      setIsFavorite(false);
    } else {
      Toast.fire({
        icon: 'warning',
        title: result.message,
      });
    }
  };

  useEffect(() => {
    if (currentUser.status) {
      const checkFavorite = async () => {
        const isFav = await validateProductFavorites(currentUser.id, idProduct);
        setIsFavorite(isFav);
      };

      checkFavorite();
    }
  }, [currentUser.id, currentUser.status, idProduct]);

  return (
    <div className={`products-grid-card-${className}`}>
      <span className={`label ${tag}`}>{tag}</span>

      {currentUser.status &&
        (isFavorite ? (
          <button className="btn-favorite" onClick={() => removeFavorites(currentUser.id, idProduct)}>
            <FaHeart size={20}/>
          </button>
        ) : (
          <button className="btn-favorite" onClick={() => addFavorites(currentUser.id, idProduct)}>
            <FaRegHeart size={20} />
          </button>
        ))}

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
