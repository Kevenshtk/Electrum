export const filterProductsByCategory = (products, category) => {
  const groups = {
    perifericos: ['monitor', 'teclado', 'mouse'],
  };

  if (groups[category]) {
    return products.filter((product) => groups[category].includes(product.category));
  }

  return products.filter((product) => product.category === category);
};

export const filterProductsByTag = (products, tag) => {
  return products.filter((product) => product.tag === tag);
}