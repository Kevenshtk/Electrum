import { Link } from 'react-router-dom';
import useWindowWidth from '../../../hooks/useWindowWidth';
import './styles.sass';

const HeaderBottom = () => {
  const width = useWindowWidth();

  const listCategories = [
    {text: 'Periféricos', url: 'perifericos'},
    {text: 'Pc Gamer', url: 'pc-gamer'},
    {text: 'Hardware', url: 'hardware'},
    {text: 'Notebooks', url: 'notebook'},
    {text: 'Celulares', url: 'celular'},
    {text: 'Câmeras', url: 'camera'},
    {text: 'Acessórios', url: 'acessorio'},
  ];

  return (
    <div className="header-bottom">
      <nav>
        <ul>
          {listCategories.map((item, index) => {
            if (
              width <= 435 &&
              (item.text === 'Periféricos' ||
                item.text === 'Notebooks' ||
                item.text === 'Câmeras')
            )
              return null;
            return (
              <li key={index}>
                <Link to={`/list/${item.url}`} className="link-category">{item.text}</Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default HeaderBottom;
