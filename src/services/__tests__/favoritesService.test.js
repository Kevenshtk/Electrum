import { api } from '../api';
import favoritesService from '../product/favoritesService';

jest.mock('../api', () => ({
  api: {
    get: jest.fn(),
    post: jest.fn(),
    delete: jest.fn(),
  },
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Servico de produtos favoritos', () => {
  const mockResponse = [{ id: 1, name: 'Produto A' }];

  describe('Busca de produtos favoritos', () => {
    it('deve retornar success true ao buscar favoritos', async () => {
      api.get.mockResolvedValueOnce({ data: mockResponse });

      const result = await favoritesService.get(1);

      expect(api.get).toHaveBeenCalledWith('/favorites/user/1');
      expect(result).toEqual({
        success: true,
        data: mockResponse,
      });
    });

    it('deve retornar success false ao falhar na busca de favoritos', async () => {
      api.get.mockRejectedValueOnce({
        response: {
          data: { message: 'Erro ao buscar produtos favoritos' },
        },
      });

      const result = await favoritesService.get(1);

      expect(result).toEqual({
        success: false,
        message: 'Erro ao buscar produtos favoritos',
      });
    });
  });

  describe('Adiciona produtos favoritos', () => {
    it('deve retonar success true ao adicionar um produto aos favoritos', async () => {
      api.post.mockResolvedValueOnce({ data: mockResponse });

      const result = await favoritesService.add(1, 1);

      expect(api.post).toHaveBeenCalledWith('/favorites', {
        usuario: {
          id: 1,
        },
        produto: {
          id: 1,
        },
      });

      expect(result).toEqual({
        success: true,
        data: mockResponse,
      });
    });

    it('deve retornar success false quando falhar ao adicionar produto', async () => {
      api.post.mockRejectedValueOnce({
        response: {
          data: {
            message: 'Erro ao adicionar produto aos favoritos',
          },
        },
      });

      const result = await favoritesService.add(1, 1);

      expect(result).toEqual({
        success: false,
        message: 'Erro ao adicionar produto aos favoritos',
      });
    });
  });

  describe('Remove produtos favorito', () => {
    it('deve remover um produto dos favoritos', async () => {
      api.delete.mockResolvedValueOnce();

      const result = await favoritesService.del(1, 1);

      expect(api.delete).toHaveBeenCalledWith('/favorites/user/1/product/1');
      expect(result).toEqual({ success: true });
    });

    it('deve retornar success false quando falhar ao remover produto', async () => {
      api.delete.mockRejectedValueOnce({
        response: {
          data: {
            message: 'Erro ao remover o produto',
          },
        },
      });

      const result = await favoritesService.del(1, 1);

      expect(result).toEqual({
        success: false,
        message: 'Erro ao remover o produto',
      });
    });
  });
});
