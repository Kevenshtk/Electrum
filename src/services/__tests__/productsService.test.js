import productsService from '../product/productService';
import { api } from '../api';

jest.mock('../api', () => ({
  api: {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  },
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Servico de produtos', () => {
  const productsListData = [
    {
      id: 1,
      name: 'Produto A',
      category: 'teste',
      description: 'teste',
      price: 0,
      image: 'teste',
      tag: 'teste',
    },
    {
      id: 2,
      name: 'Produto B',
      category: 'teste',
      description: 'teste',
      price: 0,
      image: 'teste',
      tag: 'teste',
    },
  ];

  const productData = productsListData[0];

  describe('Adicionar produto', () => {
    it('deve retornar os dados do produto ao cria-lo', async () => {
      api.post.mockResolvedValueOnce({ data: productData });

      const result = await productsService.add(productData);

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

    it('deve retornar uma mensagem de erro ao falar na criação de um produto', async () => {
      api.post.mockRejectedValueOnce({
        response: {
          data: {
            message: 'Erro ao tentar criar um produto',
          },
        },
      });

      const result = await productsService.add(productData);

      expect(api.post).toHaveBeenCalledTimes(1);
      expect(result).toEqual({
        success: false,
        message: 'Erro ao tentar criar um produto',
      });
    });
  });

  describe('Buscar protudos', () => {
    it('deve retornar uma lista com os dados dos produtos', async () => {
      api.get.mockResolvedValueOnce({ data: productsListData });

      const result = await productsService.get();

      expect(result).toEqual({
        success: true,
        data: productsListData,
      });
    });

    it('deve retornar uma mensagem de erro ao falhar na busca pelos produtos', async () => {
      api.get.mockRejectedValueOnce({
        response: {
          data: {
            message: 'Erro ao buscar produtos',
          },
        },
      });

      const result = await productsService.get();

      expect(result).toEqual({
        success: false,
        message: 'Erro ao buscar produtos',
      });
    });
  });

  describe('Buscar produto', () => {
    it('deve retornar os dados de um produto', async () => {
      api.get.mockResolvedValueOnce({ data: productsListData });

      const result = await productsService.getById(1);

      expect(result).toEqual({
        success: true,
        data: productsListData[0],
      });
    });

    it('deve retornar uma mesangem de erro ao falhar na busca da lista dos produtos', async () => {
      api.get.mockRejectedValueOnce({
        response: {
          data: {
            message: 'Erro ao buscar produtos',
          },
        },
      });

      const result = await productsService.getById(1);

      expect(api.get).toHaveBeenCalledTimes(1);

      expect(result).toEqual({
        success: false,
        message: 'Erro ao buscar produtos',
      });
    });

    it('deve retornar uma mesangem de erro ao não encontrar o produto', async () => {
      api.get.mockResolvedValueOnce({ data: productsListData });

      const result = await productsService.getById(3);

      expect(result).toEqual({
        success: false,
        message: 'Produto não encontrado!',
      });
    });
  });

  describe('Atualizar produto', () => {
    it('deve retornar as informações atualizadas do produto', async () => {
      api.put.mockResolvedValueOnce({ data: productData });

      const result = await productsService.uptProd(productData.id, productData);

      expect(api.put).toHaveBeenCalledTimes(1);
      expect(api.put).toHaveBeenCalledWith(`/products/${productData.id}`, {
        name: productData.name,
        category: productData.category,
        description: productData.description,
        price: parseFloat(productData.price),
        image: productData.image,
        tag: productData.tag,
      });

      expect(result).toEqual({
        success: true,
      });
    });

    it('deve retornar um erro ao falhar em atualizar um produto', async () => {
      api.put.mockRejectedValueOnce({
        response: {
          data: {
            message: 'Erro ao Atualizar produtos, tente mais tarde!',
          },
        },
      });

      const result = await productsService.uptProd(productData.id, productData);

      expect(api.put).toHaveBeenCalledTimes(1);
      expect(result).toEqual({
        success: false,
        message: 'Erro ao Atualizar produtos, tente mais tarde!',
      });
    });

    it('deve retornar uma mesangem de erro ao não encontrar o produto', async () => {
      api.put.mockRejectedValueOnce({
        response: {
          data: {
            status: 404,
            message: `Produto ${productData.id} não encontrado.`,
          },
        },
      });

      const result = await productsService.uptProd(productData.id, productData);

      expect(api.put).toHaveBeenCalledTimes(1);
      expect(result).toEqual({
        success: false,
        message: `Produto ${productData.id} não encontrado.`,
      });
    });
  });

  describe('Deletar produto', () => {
    it('deve deletar um produto com sucesso', async () => {
      api.delete.mockResolvedValueOnce();

      const result = await productsService.del(productData.id);

      expect(api.delete).toHaveBeenCalledTimes(1);
      expect(api.delete).toHaveBeenCalledWith(`/products/${productData.id}`);

      expect(result).toEqual({
        success: true,
      });
    });

    it('deve retornar uma mensagem de erro ao falhar em dedletar um produto', async () => {
      api.delete.mockRejectedValueOnce({
        response: {
          data: {
            message: 'Erro ao Atualizar produtos, tente mais tarde!',
          },
        },
      });

      const result = await productsService.del(productData.id);

      expect(api.delete).toHaveBeenCalledTimes(1);
      expect(result).toEqual({
        success: false,
        message: 'Erro ao Atualizar produtos, tente mais tarde!',
      });
    });

    it('deve retornar uma mesangem de erro ao não encontrar o produto', async () => {
      api.delete.mockRejectedValueOnce({
        response: {
          data: {
            status: 404,
            message: `Produto ${productData.id} não encontrado.`,
          },
        },
      });

      const result = await productsService.del(productData.id);

      expect(api.delete).toHaveBeenCalledTimes(1);
      expect(result).toEqual({
        success: false,
        message: `Produto ${productData.id} não encontrado.`,
      });
    });
  });
});
