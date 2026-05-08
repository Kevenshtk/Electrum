import { api } from '../api';
import { getEmailExists, checkEmail } from '../user/checkEmail';

jest.mock('../api', () => ({
  api: {
    get: jest.fn(),
  },
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Servico de check de email', () => {
  const users = [{ email: 'teste@gmail.com' }];
  describe('buscar emails existentes', () => {
    it('deve retornar success true com dados quando a API responder', async () => {
      api.get.mockResolvedValueOnce({ data: users });

      const result = await getEmailExists('teste@gmail.com');

      expect(api.get).toHaveBeenCalledWith('/users');
      expect(result).toEqual({
        success: true,
        data: users,
      });
    });

    it('deve retornar success false quando a API falhar', async () => {
      api.get.mockRejectedValueOnce(new Error('Erro ao buscar informações'));

      const result = await getEmailExists('teste@gmail.com');

      expect(result).toEqual({
        success: false,
        message: 'Erro ao buscar informações',
      });
    });
  });

  describe('verificar se email existe', () => {
    it('deve retornar success false e emailExists null quando a API falhar', async () => {
      api.get.mockRejectedValueOnce(new Error('Erro ao buscar informações'));

      const result = await checkEmail('teste@gmail.com');

      expect(result).toEqual({
        success: false,
        emailExists: null,
      });
    });

    it('deve retornar success true e emailExists true quando o email existir', async () => {
      api.get.mockResolvedValueOnce({ data: users });

      const result = await checkEmail('teste@gmail.com');
      expect(result).toEqual({
        success: true,
        emailExists: true,
      });
    });

    it('deve retornar success true e emailExists false quando o email não existir', async () => {
      api.get.mockResolvedValueOnce({ data: users });

      const result = await checkEmail('outro@gmail.com');
      expect(result).toEqual({
        success: true,
        emailExists: false,
      });
    });
  });

});
