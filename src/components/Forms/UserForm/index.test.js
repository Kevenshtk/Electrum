import { render, screen } from '@testing-library/react';
import UserForm from './index';
import { AuthContext } from '../../../context/auth';
import { registerUser } from '../../../services/user/userService';
import userEvent from '@testing-library/user-event';
import alert from '../../../utils/alert';

jest.mock('../../../context/auth', () => {
  const React = require('react');

  return {
    AuthContext: React.createContext({
      handleLogin: jest.fn(),
    }),
  };
});

jest.mock('../../../services/user/userService', () => ({
  registerUser: jest.fn(),
}));

jest.mock('../../../utils/alert', () => ({
  success: jest.fn(),
  error: jest.fn(),
}));

beforeEach(() => {
  jest.clearAllMocks();
});

const renderForm = (handleLogin, setShowModal, isFormRegister = true) => {
  render(
    <AuthContext.Provider value={{ handleLogin }}>
      <UserForm isFormRegister={isFormRegister} setShowModal={setShowModal} />
    </AuthContext.Provider>
  );
};

describe('UserForm - Cadastro', () => {
  const fillFormRegisterAndSubmit = async () => {
    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/primeiro nome/i), 'Teste');

    await user.type(screen.getByLabelText(/email/i), 'teste@gmail.com');

    await user.type(screen.getByLabelText(/senha/i), '123456');

    await user.click(screen.getByRole('button', { name: /cadastrar/i }));
  };

  const handleLogin = jest.fn();
  const setShowModal = jest.fn();

  it('deve realizar cadastro com sucesso', async () => {
    registerUser.mockResolvedValueOnce({
      success: true,
    });

    renderForm(handleLogin, setShowModal);

    await fillFormRegisterAndSubmit();

    expect(registerUser).toHaveBeenCalledWith({
      firstUserName: 'Teste',
      email: 'teste@gmail.com',
      password: '123456',
    });

    expect(alert.success).toHaveBeenCalledWith(
      'Cadastrado realizado com sucesso!'
    );

    expect(setShowModal).toHaveBeenCalledWith(false);
  });

  it('deve exibir uma mensagem de erro ao enviar o formulário com um e-mail já cadastrado', async () => {
    registerUser.mockResolvedValueOnce({
      success: true,
      emailExists: true,
    });

    renderForm(handleLogin, setShowModal);

    await fillFormRegisterAndSubmit();

    expect(registerUser).toHaveBeenCalledWith({
      firstUserName: 'Teste',
      email: 'teste@gmail.com',
      password: '123456',
    });

    expect(alert.error).toHaveBeenCalledWith(
      'error',
      'Oops...',
      'Este e-mail já está cadastrado.'
    );
  });

  it('deve exibir erro genérico quando ocorrer falha no servidor', async () => {
    registerUser.mockResolvedValueOnce({
      success: false,
      message: 'Erro ao registrar usuário',
    });

    renderForm(handleLogin, setShowModal);

    await fillFormRegisterAndSubmit();

    expect(registerUser).toHaveBeenCalledWith({
      firstUserName: 'Teste',
      email: 'teste@gmail.com',
      password: '123456',
    });

    expect(alert.error).toHaveBeenCalledWith(
      'info',
      'Erro ao realizar o cadastro.',
      'Por favor tente novamente mais tarde.'
    );
  });
});

describe('UserForm - Login', () => {
  const fillFormLoginAndSubmit = async ({
    email = 'teste@gmail.com',
    password = '123456',
  } = {}) => {
    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/email/i), email);

    await user.type(screen.getByLabelText(/senha/i), password);

    await user.click(screen.getByRole('button', { name: /entrar/i }));
  };

  it('deve realizar login com sucesso', async () => {
    const handleLogin = jest.fn().mockResolvedValueOnce('ok');
    const setShowModal = jest.fn();

    renderForm(handleLogin, setShowModal, false);

    await fillFormLoginAndSubmit();

    expect(handleLogin).toHaveBeenCalledWith('teste@gmail.com', '123456');

    expect(setShowModal).toHaveBeenCalledWith(false);
  });

  it('deve exibir erro para credenciais inválidas', async () => {
    const handleLogin = jest.fn().mockResolvedValueOnce('failed');
    const setShowModal = jest.fn();

    renderForm(handleLogin, setShowModal, false);

    await fillFormLoginAndSubmit({ email: 'teste@gmail.co' });

    expect(handleLogin).toHaveBeenCalledWith('teste@gmail.co', '123456');

    expect(alert.error).toHaveBeenCalledWith(
      'error',
      'Oops...',
      'Verifique seu e-mail ou senha.'
    );
  });

  it('deve exibir erro genérico quando ocorrer falha no servidor', async () => {
    const handleLogin = jest.fn().mockResolvedValueOnce('server_error');
    const setShowModal = jest.fn();

    renderForm(handleLogin, setShowModal, false);

    await fillFormLoginAndSubmit();

    expect(handleLogin).toHaveBeenCalledWith('teste@gmail.com', '123456');

    expect(alert.error).toHaveBeenCalledWith(
      'info',
      'Erro ao realizar login',
      'Tente novamente mais tarde.'
    );
  });
});
