import useWindowWidth from '../../../hooks/useWindowWidth';
import Button from '../../Button';
import './styles.sass';

const HeaderBottom = ({ handleCategoryClick }) => {
  const width = useWindowWidth();

  return (
    <div className="header-bottom">
      <nav>
        <ul>
          {[
            'Periféricos',
            'Pc Gamer',
            'Hardware',
            'Notebooks',
            'Smartphones',
            'Câmeras',
            'Acessórios',
          ].map((category, index) => {
            if (
              width <= 435 &&
              (category === 'Periféricos' ||
                category === 'Notebooks' ||
                category === 'Câmeras')
            )
              return null;
            return (
              <li key={index}>
                <Button
                  className="btn-category"
                  text={category}
                  onClick={() => handleCategoryClick(category)}
                />
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default HeaderBottom;
