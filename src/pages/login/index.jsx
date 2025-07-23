import Input from '../../components/Input';
import Button from '../../components/Button';

import Swal from 'sweetalert2';

import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { fetchLogin } from '../../services/loginService.js';

import './styles.sass';

const schema = yup.object({
  email: yup
    .string()
    .email('E-mail inválido')
    .required('O e-mail é obrigatório'),

  password: yup
    .string()
    .min(6, 'A senha deve ter pelo menos 6 caracteres')
    .required('A senha é obrigatório'),
});

const Login = ({ setCurrentUser }) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const users = await fetchLogin();

    if (!users) {
      Swal.fire({
        position: 'top',
        icon: 'info',
        title: 'Erro ao realizar login',
        text: 'Tente novamente mais tarde.',
        showConfirmButton: false,
        timer: 3000,
      });

      return null;
    }

    const user = users.find(
      (user) => user.email === data.email && user.password === data.password
    );
    console.log(user)

    if (user) {
      setCurrentUser({
        status: true,
        email: data.email,
        name: user.username,
      });

      navigate('/');
    } else {
      Swal.fire({
        position: 'top',
        icon: 'error',
        title: 'Oops...',
        text: 'Verifique seu e-mail ou senha.',
        showConfirmButton: false,
        timer: 3000,
      });
    }
  };

  return (
    <main className="mainLogin">
      <h1>Faça seu login</h1>
      <form onSubmit={handleSubmit(onSubmit)} id="loginForm">
        <Input
          name="email"
          label="Email"
          className="inputEmail"
          control={control}
          render={({ field }) => (
            <div className="containerInputError">
              <input
                id="email"
                type="email"
                placeholder="usuario@email.com"
                {...field}
              />
              <span className="error">
                {errors.email && errors.email.message}
              </span>
            </div>
          )}
        />

        <Input
          name="password"
          label="Senha"
          className="inputPassword"
          control={control}
          render={({ field }) => (
            <div className="containerInputError">
              <input
                id="password"
                type="password"
                placeholder="senha"
                {...field}
              />
              <span className="error">
                {errors.password && errors.password.message}
              </span>
            </div>
          )}
        />

        <div className="containerBtnRow">
          <Button
            type="submit"
            className="btn"
            disabled={isSubmitting}
            text={isSubmitting ? 'Entrando...' : 'Entrar'}
          />

          <Button
            type="button"
            className="btn"
            disabled={isSubmitting}
            text="Esqueci a senha"
          />
        </div>
      </form>
    </main>
  );
};

export default Login;
