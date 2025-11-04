import { Link } from 'react-router-dom';

import "./styles.sass";

const Banner = ({ id, text, category }) => {

  return (
    <div className="banner" id={id}>
      <div className="banner-cover"></div>
      <div className="banner-content">
        <h2>{text}</h2>
        <Link className='link' to={`/list/${category}`}>Ver Mais</Link>
      </div>
    </div>
  );
};

export default Banner;
