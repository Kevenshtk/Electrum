import {
  filterProductsByCategory,
  filterProductsByTag,
} from './filterProducts';

import { formatPrice, formatCategory } from './textFormatter';

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


describe('Formatação de texto', () => {
    it('deve retornar o preço no formato de moeda brasileira', () => {
    const value = formatPrice(1000);
    expect(value).toBe('1.000,00');
  });

  it('deve retornar o nome da categoria formatado', () => {
    const value = formatCategory('pc-gamer');
    expect(value).toBe('Pc Gamer');
  });
});