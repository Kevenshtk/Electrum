import "./styles.sass";
import { FaCircleArrowRight } from "react-icons/fa6";

const Banner = ({ id, text }) => {
  return (
    <div className="banner" id={id}>
      <div className="banner-cover"></div>
      <div className="banner-content">
        <h2>{text}</h2>
        <a href="#">Ver Mais<FaCircleArrowRight className="icon"/></a>
      </div>
    </div>
  );
};

export default Banner;
