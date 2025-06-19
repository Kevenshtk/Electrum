export const filterProductsByCategory = (products, category) => {
  const groups = {
    Periféricos: ['Monitores', 'Teclados', 'Mouses'],
  };

  if (groups[category]) {
    return products.filter((product) => groups[category].includes(product.category));
  }

  return products.filter((product) => product.category === category);
};