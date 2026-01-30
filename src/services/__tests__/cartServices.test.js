import { api } from '../api';
import { cartService } from '../productService';

jest.mock('../api', () => ({
  api: {
    get: jest.fn(),
    post: jest.fn(),
    delete: jest.fn(),
    put: jest.fn(),
  },
}));

describe('Servico de carrinho de compras', () => {
  describe('Adicionar produtos ao carrinho', () => {
    it('deve retornar success true e os dados do carrinho ao adicionar', async () => {
      api.post.mockResolvedValueOnce({ data: { idUser: 1, idProduct: 1 } });

      const result = await cartService.add(1, 1);

      expect(api.post).toHaveBeenCalledWith(
        '/shopping-cart',
        {
          usuario: {
            id: 1,
          },
          produto: {
            id: 1,
          },
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      expect(result).toEqual({
        success: true,
        data: {
          idUser: 1,
          idProduct: 1,
        },
      });
    });

    it('deve retornar success false e uma mensagem de erro ao falhar em adicionar', async () => {
      api.post.mockRejectedValueOnce({
        response: {
          data: {
            message: 'Erro ao adicionar produto no carrinho',
          },
          status: 500,
        },
      });

      const result = await cartService.add(1, 1);

      expect(api.post).toHaveBeenCalledTimes(1);
      expect(result).toEqual({
        success: false,
        message: 'Erro ao adicionar produto no carrinho',
        status: 500,
      });
    });
  });

  describe('Buscar de produtos no carrinho', () => {
    it('deve retornar success true e os dados do carrinho ao buscar', async () => {
      api.get.mockResolvedValueOnce({
        data: [
          {
            produto: {
              idProduct: 1,
              nome: 'Produto A',
            },
            quant: 1,
          },
          {
            produto: {
              idProduct: 2,
              nome: 'Produto B',
            },
            quant: 1,
          },
        ],
      });

      const result = await cartService.get(1);

      expect(api.get).toHaveBeenCalledWith('/shopping-cart/user/1');
      expect(result).toEqual({
        success: true,
        data: [
          {
            produto: {
              idProduct: 1,
              nome: 'Produto A',
            },
            quant: 1,
          },
          {
            produto: {
              idProduct: 2,
              nome: 'Produto B',
            },
            quant: 1,
          },
        ],
      });
    });

    it('deve retornar success false e uma mensagem de erro ao falhar em buscar', async () => {
      api.get.mockRejectedValueOnce({
        response: {
          data: {
            message: 'Erro ao buscar produtos',
          },
          status: 500,
        },
      });

      const result = await cartService.get(1);

      expect(api.get).toHaveBeenCalledTimes(1);
      expect(result).toEqual({
        success: false,
        message: 'Erro ao buscar produtos',
        status: 500,
      });
    });
  });
  describe('Remover produtos do carrinho', () => {
    it('deve retornar success true ao remover', async () => {
      api.delete.mockResolvedValueOnce({ status: 202 });

      const result = await cartService.del(1, 1);

      expect(api.delete).toHaveBeenCalledWith(
        '/shopping-cart/user/1/product/1'
      );

      expect(result).toEqual({ success: true });
    });

    it('deve retornar success false e uma mesagem de erro ao falhar em remover', async () => {
      api.delete.mockRejectedValueOnce({
        response: {
          data: {
            message: 'Erro ao remover o produto',
          },
          status: 500,
        },
      });

      const result = await cartService.del(1, 1);

      expect(api.delete).toHaveBeenCalledTimes(1);
      expect(result).toEqual({
        success: false,
        message: 'Erro ao remover o produto',
        status: 500,
      });
    });
  });
});
