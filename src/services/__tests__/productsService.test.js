import { createProduct } from '../product/productService';
import { api } from '../api';

jest.mock('../api', () => ({
  api: {
    get: jest.fn(),
    post: jest.fn(),
  },
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Servico de produtos', () => {
  const productData = {
    name: 'Produto A',
    category: 'teste',
    description: 'teste',
    price: 0,
    image: 'teste',
    tag: 'teste',
  };
  it('deve retornar success true e os dados do produto ao cria-lo', async () => {
    api.post.mockResolvedValueOnce({ data: productData });

    const result = await createProduct(productData);

    expect(api.post).toHaveBeenCalledWith('/products', {
      name: productData.name,
      category: productData.category,
      description: productData.description,
      price: parseFloat(productData.price),
      image: productData.image,
      tag: productData.tag,
    });

    expect(result).toEqual({
      success: true,
      data: productData,
    });
  });

  it('deve retornar success false e uma mensagem de erro', async () => {
    api.post.mockRejectedValueOnce({
      response: {
        data: {
          message: 'Erro ao tentar criar um produto',
        },
      },
    });

    const result = await createProduct(productData);

    expect(api.post).toHaveBeenCalledTimes(1);
    expect(result).toEqual({
      success: false,
      message: 'Erro ao tentar criar um produto',
    });
  });
});
