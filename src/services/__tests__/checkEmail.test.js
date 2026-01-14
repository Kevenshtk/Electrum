import { fetchLogin } from '../loginService';
import { checkEmail } from '../userService';

jest.mock('../api', () => ({
  api: { get: jest.fn() },
}));

jest.mock('../loginService', () => ({
  fetchLogin: jest.fn(),
}));

describe('Check email', () => {
  const loginData = { success: true, data: [{ email: 'keven@gmail.com' }] };
  it('deve retornar errorEmail ao verificar se o email ja existe', async () => {
    fetchLogin.mockResolvedValueOnce(loginData);

    const result = await checkEmail('keven@gmail.com');
    expect(result).toBe('errorEmail');
  });

  it('deve retornar ok ao verificar um email nao cadastrado', async () => {
    fetchLogin.mockResolvedValueOnce(loginData);

    const result = await checkEmail('outro@gmail.com');
    expect(result).toBe('ok');
  });

  it('deve retornar errorServer ao verificar um email nao cadastrado', async () => {
    fetchLogin.mockRejectedValueOnce({
        success: false,
        message: 'Erro ao buscar informações',
        status: 500,
    });

    const result = await checkEmail('outro@gmail.com');
    expect(result).toBe('errorServer');
  });
});
