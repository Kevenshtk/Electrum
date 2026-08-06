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

const handleLogin = jest.fn();
const setShowModal = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
});

const renderForm = (
  handleLogin = jest.fn(),
  setShowModal = jest.fn(),
  isFormRegister = true
) => {
  render(
    <AuthContext.Provider value={{ handleLogin }}>
      <UserForm isFormRegister={isFormRegister} setShowModal={setShowModal} />
    </AuthContext.Provider>
  );
};

const userData = {
  firstUserName: 'Teste',
  email: 'teste@gmail.com',
  password: '123456',
};

const fillFormAndSubmit = async (isFormRegister = true) => {
  const user = userEvent.setup();
  const buttonLabel = isFormRegister ? /Cadastrar/i : /Entrar/i;

  if (isFormRegister) {
    await user.type(
      screen.getByLabelText(/primeiro nome/i),
      userData.firstUserName
    );
  }

  await user.type(screen.getByLabelText(/email/i), userData.email);
  await user.type(screen.getByLabelText(/senha/i), userData.password);

  await user.click(screen.getByRole('button', { name: buttonLabel }));
};

describe('UserForm - Cadastro', () => {
  it('deve renderizar o formulário de cadastro', () => {
    renderForm();

    expect(
      screen.getByRole('heading', {
        name: /Cadastre-se/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole('button', {
        name: /Cadastrar/i,
      })
    ).toBeInTheDocument();
  });

  it('deve chamar registerUser com os dados do formulário', async () => {
    registerUser.mockResolvedValueOnce({
      success: true,
    });

    renderForm();

    await fillFormAndSubmit();

    expect(registerUser).toHaveBeenCalledWith({
      firstUserName: userData.firstUserName,
      email: userData.email,
      password: userData.password,
    });
  });

  it('deve exibir uma mensagem de sucesso ao cadastrar o usuário', async () => {
    registerUser.mockResolvedValueOnce({
      success: true,
    });

    renderForm(handleLogin, setShowModal);

    await fillFormAndSubmit();

    expect(alert.success).toHaveBeenCalledWith(
      'Cadastrado realizado com sucesso!'
    );

    expect(setShowModal).toHaveBeenCalledWith(false);
  });

  it('deve exibir mensagem de validação quando o formulário for enviado sem preencher os campos', async () => {
    renderForm();

    const user = userEvent.setup();
    await user.click(screen.getByRole('button', { name: /Cadastrar/i }));

    expect(
      screen.getByText(/O primeiro nome é obrigatório/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Email obrigatório/i)).toBeInTheDocument();
    expect(screen.getByText(/Senha obrigatória/i)).toBeInTheDocument();
  });

  it('deve exibir uma mensagem de erro ao enviar o formulário com um e-mail já cadastrado', async () => {
    registerUser.mockResolvedValueOnce({
      success: true,
      emailExists: true,
    });

    renderForm();

    await fillFormAndSubmit();

    expect(registerUser).toHaveBeenCalledWith({
      firstUserName: userData.firstUserName,
      email: userData.email,
      password: userData.password,
    });

    expect(alert.error).toHaveBeenCalledWith(
      'error',
      'Oops...',
      'Este e-mail já está cadastrado.'
    );

    expect(setShowModal).not.toHaveBeenCalled();
  });

  it('deve exibir erro genérico quando ocorrer falha no servidor', async () => {
    registerUser.mockResolvedValueOnce({
      success: false,
      message: 'Erro ao registrar usuário',
    });

    renderForm();

    await fillFormAndSubmit();

    expect(registerUser).toHaveBeenCalledWith({
      firstUserName: userData.firstUserName,
      email: userData.email,
      password: userData.password,
    });

    expect(alert.error).toHaveBeenCalledWith(
      'info',
      'Erro ao realizar o cadastro.',
      'Por favor tente novamente mais tarde.'
    );

    expect(setShowModal).not.toHaveBeenCalled();
  });
});

describe('UserForm - Login', () => {
  it('deve renderizar o formulário de Login', () => {
    renderForm(handleLogin, setShowModal, false);

    expect(
      screen.getByRole('heading', {
        name: /Faça seu login/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole('button', {
        name: /Entrar/i,
      })
    ).toBeInTheDocument();

    expect(screen.queryByLabelText(/primeiro nome/i)).not.toBeInTheDocument();
  });

  it('deve chamar handleLogin com os dados do formulário', async () => {
    renderForm(handleLogin, setShowModal, false);

    await fillFormAndSubmit(false);

    expect(handleLogin).toHaveBeenCalledWith(userData.email, userData.password);
    expect(handleLogin).toHaveBeenCalledTimes(1);
  });

  it('deve fechar o modal ao realizar login com sucesso', async () => {
    const handleLogin = jest.fn().mockResolvedValueOnce('ok');

    renderForm(handleLogin, setShowModal, false);

    await fillFormAndSubmit(false);

    expect(alert.error).not.toHaveBeenCalled();

    expect(setShowModal).toHaveBeenCalledWith(false);
  });

  it('deve exibir mensagem de validação quando o formulário for enviado sem preencher os campos', async () => {
    renderForm(handleLogin, setShowModal, false);

    const user = userEvent.setup();
    await user.click(screen.getByRole('button', { name: /Entrar/i }));

    expect(screen.getByText(/Email obrigatório/i)).toBeInTheDocument();
    expect(screen.getByText(/Senha obrigatória/i)).toBeInTheDocument();
  });

  it('deve exibir um alerta de erro para credenciais inválidas', async () => {
    const handleLogin = jest.fn().mockResolvedValueOnce('failed');

    renderForm(handleLogin, setShowModal, false);

    await fillFormAndSubmit(false);

    expect(handleLogin).toHaveBeenCalledWith(userData.email, userData.password);

    expect(alert.error).toHaveBeenCalledWith(
      'error',
      'Oops...',
      'Verifique seu e-mail ou senha.'
    );

    expect(setShowModal).not.toHaveBeenCalled();
  });

  it('deve exibir um alerta de erro quando ocorrer falha no servidor', async () => {
    const handleLogin = jest.fn().mockResolvedValueOnce('server_error');

    renderForm(handleLogin, setShowModal, false);

    await fillFormAndSubmit(false);

    expect(handleLogin).toHaveBeenCalledWith(userData.email, userData.password);

    expect(alert.error).toHaveBeenCalledWith(
      'info',
      'Erro ao realizar login',
      'Tente novamente mais tarde.'
    );

    expect(setShowModal).not.toHaveBeenCalled();
  });
});
