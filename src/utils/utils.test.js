import {
  filterProductsByCategory,
  filterProductsByTag,
} from './filterProducts';

describe('Filtros de produtos', () => {
  const products = [
    {
      id: '1',
      category: 'Mouses',
      tag: 'hot',
    },
    {
      id: '2',
      category: 'Teclados',
      tag: 'hot',
    },
    {
      id: '3',
      category: 'Monitores',
      tag: 'promo',
    },
  ];
  it('deve retornar os produtos da tag especificada', () => {
    const value = filterProductsByTag(products, 'hot');
    expect(value.every((product) => product.tag === 'hot')).toBe(true);
  });

  it('deve retornar os produtos da categoria especificada', () => {
    const value = filterProductsByCategory(products, 'Mouses');
    expect(value.every((product) => product.category === 'Mouses')).toBe(true);
  });
});
