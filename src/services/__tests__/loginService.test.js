import { api } from '../api';
import { fetchLogin } from '../user/loginService';

jest.mock('../api', () => ({
  api: {
    get: jest.fn(),
  },
}));

describe('Servico de login', () => {
  it('deve retornar success true e os dados do usuario ao realizar o login', async () => {
    const dataUser = [
      { username: 'teste', email: 'teste@emal.com', password: '123456' },
    ];
    api.get.mockResolvedValueOnce({ data: dataUser });

    const result = await fetchLogin();

    expect(api.get).toHaveBeenCalledWith('/users');
    expect(result).toEqual({
      success: true,
      data: dataUser,
    });
  });

  it('deve retornar success false ao falhar no login', async () => {
    api.get.mockRejectedValueOnce({
      response: {
        data: {
          message: 'Erro ao buscar informações',
        },
        status: 500,
      },
    });

    const result = await fetchLogin();

    expect(api.get).toHaveBeenCalledTimes(1);
    expect(result).toEqual({
      success: false,
      message: 'Erro ao buscar informações',
      status: 500,
    });
  });
});
