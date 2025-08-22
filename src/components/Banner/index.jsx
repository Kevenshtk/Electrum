import { useNavigate } from 'react-router-dom';

import Button from '../Button';

import "./styles.sass";

const Banner = ({ id, text, category }) => {
  const navegate = useNavigate();

  const handleCategoryClick = (category) => {
    navegate(`/list/${category}`);
  }

  return (
    <div className="banner" id={id}>
      <div className="banner-cover"></div>
      <div className="banner-content">
        <h2>{text}</h2>
        <Button className="btn-banner" text="Ver Mais" onClick={() => handleCategoryClick(category)}/>
      </div>
    </div>
  );
};

export default Banner;
