import { api } from './api.js';

export const createProduct = async (productData) => {
  const response = await api.post(
    '/products',
    {
      name: productData.name,
      category: productData.category,
      description: productData.description,
      price: parseFloat(productData.price),
      image: productData.image,
      tag: productData.tag,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  return response.data;
};
