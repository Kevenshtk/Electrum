import { api } from '../api';
import { checkEmail } from '../user/checkEmail';
import { registerUser } from '../user/userService';

jest.mock('../api', () => ({
  api: { post: jest.fn() },
}));

jest.mock('../user/checkEmail', () => ({
  checkEmail: jest.fn(),
}));

describe('Servico de usuario', () => {
  const userData = {
    firstUserName: 'teste',
    email: 'teste@gmail.com',
    password: '1234',
  };

  it('deve retornar success true ao cadastrar um usuario', async () => {
    checkEmail.mockResolvedValueOnce({ success: true, emailExists: false });
    api.post.mockResolvedValueOnce({ data: { id: 1 } });

    const result = await registerUser(userData);

    expect(checkEmail).toHaveBeenCalledWith(userData.email);
    expect(api.post).toHaveBeenCalledWith(
      '/users',
      {
        username: userData.firstUserName,
        email: userData.email,
        password: userData.password,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    expect(result).toEqual({ success: true });
  });

  it('deve retornar erro quando a API falhar ao registrar o usuário', async () => {
    checkEmail.mockResolvedValueOnce({ success: true, emailExists: false });
    api.post.mockRejectedValueOnce(new Error('API fora'));

    const result = await registerUser(userData);

    expect(checkEmail).toHaveBeenCalledWith(userData.email);
    expect(api.post).toHaveBeenCalledTimes(1);
    expect(result).toEqual({
      success: false,
      message: 'Erro ao registrar usuário',
      status: 500,
    });
  });

  it('deve retornar emailExists true ao verificar se o email ja existe', async () => {
    checkEmail.mockResolvedValueOnce({ success: true, emailExists: true });

    const result = await registerUser(userData);

    expect(checkEmail).toHaveBeenCalled();
    expect(api.post).not.toHaveBeenCalled();
    expect(result).toEqual({
      success: true,
      emailExists: true,
    });
  });

  it('deve retornar message: "Erro ao verificar email" caso a API falhe ao verificar o email', async () => {
    checkEmail.mockResolvedValueOnce({
      success: false,
      message: 'Erro ao buscar informações',
      status: 500,
    });

    const result = await registerUser(userData);

    expect(checkEmail).toHaveBeenCalled();
    expect(api.post).not.toHaveBeenCalled();
    expect(result).toEqual({
      success: false,
      message: 'Erro ao verificar email',
    });
  });
});
