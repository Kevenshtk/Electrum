export const formatCategory = (category) => {
  const listCategories = [
    { text: 'Periféricos', url: 'perifericos' },
    { text: 'Pc Gamer', url: 'pc-gamer' },
    { text: 'Hardware', url: 'hardware' },
    { text: 'Notebooks', url: 'notebook' },
    { text: 'Celulares', url: 'celular' },
    { text: 'Câmeras', url: 'camera' },
    { text: 'Acessórios', url: 'acessorio' },
  ];

  const categoryFormated = listCategories.find((item) => item.url === category);

  return categoryFormated?.text ?? category;
};

export const formatPrice = (price) => {
  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
};
