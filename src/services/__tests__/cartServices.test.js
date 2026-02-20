import { api } from '../api';
import cartService from '../product/cartService';

jest.mock('../api', () => ({
  api: {
    get: jest.fn(),
    post: jest.fn(),
    delete: jest.fn(),
    put: jest.fn(),
  },
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Servico de carrinho de compras', () => {
  describe('Adicionar produtos ao carrinho', () => {
    it('deve retornar success true e os dados do carrinho ao adicionar', async () => {
      api.post.mockResolvedValueOnce({ data: { idUser: 1, idProduct: 1 } });

      const result = await cartService.add(1, 1);

      expect(api.post).toHaveBeenCalledWith('/shopping-cart', {
        usuario: {
          id: 1,
        },
        produto: {
          id: 1,
        },
      });

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
        },
      });

      const result = await cartService.add(1, 1);

      expect(api.post).toHaveBeenCalledTimes(1);
      expect(result).toEqual({
        success: false,
        message: 'Erro ao adicionar produto no carrinho',
      });
    });
  });

  describe('Buscar produtos no carrinho', () => {
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
        },
      });

      const result = await cartService.get(1);

      expect(api.get).toHaveBeenCalledTimes(1);
      expect(result).toEqual({
        success: false,
        message: 'Erro ao buscar produtos',
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
        },
      });

      const result = await cartService.del(1, 1);

      expect(api.delete).toHaveBeenCalledTimes(1);
      expect(result).toEqual({
        success: false,
        message: 'Erro ao remover o produto',
      });
    });
  });

  describe('Alterar quantidade de produtos no carrinho', () => {
    it('deve retornar success true ao incrementar', async () => {
      api.put.mockResolvedValueOnce();

      const result = await cartService.inc(1, 1);

      expect(api.put).toHaveBeenCalledWith(
        '/shopping-cart/user/1/product/1/increment'
      );
      expect(result).toEqual({ success: true });
    });

    it('deve retornar success false e uma mesagem de erro ao falhar em incrementar', async () => {
      api.put.mockRejectedValueOnce({
        response: {
          data: {
            message: 'Erro no servidor',
          },
        },
      });

      const result = await cartService.inc(1, 1);

      expect(api.put).toHaveBeenCalledTimes(1);
      expect(result).toEqual({
        success: false,
        message: 'Erro no servidor',
      });
    });

    it('deve retornar success true ao decrementar', async () => {
      api.put.mockResolvedValueOnce({ status: 202 });

      const result = await cartService.dec(1, 1);

      expect(api.put).toHaveBeenCalledWith(
        '/shopping-cart/user/1/product/1/decrement'
      );
      expect(result).toEqual({ success: true, status: 202 });
    });

    it('deve retornar success true e status 200 quando a API retornar 200 no decrement', async () => {
      api.put.mockResolvedValueOnce({ status: 200 });

      const result = await cartService.dec(1, 1);

      expect(api.put).toHaveBeenCalledTimes(1);
      expect(result).toEqual({ success: true, status: 200 });
    });

    it('deve retornar success false e uma mesagem de erro ao falhar em decrementar', async () => {
      api.put.mockRejectedValueOnce({
        response: {
          data: {
            message: 'Erro no servidor',
          },
        },
      });

      const result = await cartService.dec(1, 1);

      expect(api.put).toHaveBeenCalledTimes(1);
      expect(result).toEqual({
        success: false,
        message: 'Erro no servidor',
      });
    });
  });

  describe('Calcular total do carrinho', () => {
    it('deve retornar success true e o total do carrinho', async () => {
      api.get.mockResolvedValueOnce({ data: { total: 1000 } });

      const result = await cartService.total(1);

      expect(api.get).toHaveBeenCalledWith('/shopping-cart/user/1/total');
      expect(result).toEqual({
        success: true,
        data: 1000,
      });
    });

    it('deve retornar success false e uma mensagem de erro ao falhar em calcular o total', async () => {
      api.get.mockRejectedValueOnce({
        response: {
          data: {
            message: 'Erro no servidor',
          },
        },
      });

      const result = await cartService.total(1);

      expect(api.get).toHaveBeenCalledTimes(1);
      expect(result).toEqual({
        success: false,
        message: 'Erro no servidor',
      });
    });
  });
});
