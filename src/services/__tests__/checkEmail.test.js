import { fetchLogin } from '../user/loginService';
import { checkEmail } from '../user/checkEmail';

jest.mock('../api', () => ({
  api: { get: jest.fn() },
}));

jest.mock('../user/loginService', () => ({
  fetchLogin: jest.fn(),
}));

describe('Verificar email', () => {
  const loginData = { success: true, data: [{ email: 'keven@gmail.com' }] };
  it('deve retornar emailExists true ao verificar se o email ja existe', async () => {
    fetchLogin.mockResolvedValueOnce(loginData);

    const result = await checkEmail('keven@gmail.com');

    expect(fetchLogin).toHaveBeenCalledTimes(1);
    expect(result).toEqual({ success: true, emailExists: true });
  });

  it('deve retornar emailExists false ao verificar um email nao cadastrado', async () => {
    fetchLogin.mockResolvedValueOnce(loginData);

    const result = await checkEmail('outro@gmail.com');

    expect(fetchLogin).toHaveBeenCalledTimes(1);
    expect(result).toEqual({ success: true, emailExists: false });
  });

  it('deve retornar erro quando o serviço de login falhar', async () => {
    fetchLogin.mockResolvedValueOnce({
      success: false,
      message: 'Erro ao buscar informações',
      status: 500,
    });

    const result = await checkEmail('outro@gmail.com');

    expect(result).toEqual({
      success: false,
      message: 'Erro ao buscar informações',
      status: 500,
    });
  });
});
