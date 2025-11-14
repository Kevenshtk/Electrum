import { Link } from 'react-router-dom';
import useWindowWidth from '../../../hooks/useWindowWidth';
import { formatCategory } from '../../../utils/textFormatter';
import './styles.sass';

const listCategories = [
  'perifericos',
  'pc-gamer',
  'hardware',
  'notebook',
  'celular',
  'camera',
  'acessorio',
];

const HeaderBottom = () => {
  const width = useWindowWidth();

  return (
    <div className="header-bottom">
      <nav>
        <ul>
          {listCategories.map((item, index) => {
            if (
              width <= 435 &&
              (item === 'perifericos' ||
                item === 'notebook' ||
                item === 'camera')
            )
              return null;
            return (
              <li key={index}>
                <Link to={`/list/${item}`} className="link-category">
                  {formatCategory(item)}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default HeaderBottom;
