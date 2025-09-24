import Input from '../../Input';
import Button from '../../Button';

import Swal from 'sweetalert2';

import { useForm } from 'react-hook-form';
import { useContext } from 'react';
import { AuthContext } from '../../../context/auth';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { registerUser } from '../../../services/userService.js';

import './styles.sass';

const UserForm = ({ setShowModal, isFormRegister }) => {
  const { handleLogin } = useContext(AuthContext);
  
  const schema = yup.object({
    firstUserName: isFormRegister
      ? yup
          .string()
          .min(3, 'O campo deve ter pelo menos 3 caracteres')
          .required('O primeiro nome é obrigatório')
      : yup.string(),

    email: yup
      .string()
      .email('E-mail inválido')
      .required('O e-mail é obrigatório'),

    password: yup
      .string()
      .min(6, 'A senha deve ter pelo menos 6 caracteres')
      .required('A senha é obrigatório'),
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      firstUserName: '',
      email: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    if (isFormRegister) {
      const statusRegister = await registerUser(data);

      switch (statusRegister) {
        case 'ok':
          Swal.fire({
            position: 'top',
            icon: 'success',
            title: 'Cadastrado realizado com sucesso!',
            showConfirmButton: false,
            timer: 1500,
          });
          setShowModal(false);
          
          break;

        case 'errorEmail':
          Swal.fire({
            position: 'top',
            icon: 'error',
            title: 'Oops...',
            text: 'Este e-mail já está cadastrado.',
            showConfirmButton: false,
            timer: 2800,
          });
          break;

        case 'errorServer':
          Swal.fire({
            position: 'top',
            icon: 'error',
            title: 'Erro ao realizar o cadastro.',
            text: 'Por favor tente novamente mais tarde.',
            showConfirmButton: false,
            timer: 2800,
          });
          break;
      }

      return;
    }

    const statusLogin = await handleLogin(data.email, data.password);

    if (statusLogin === 'erroServer') {
      Swal.fire({
        position: 'top',
        icon: 'info',
        title: 'Erro ao realizar login',
        text: 'Tente novamente mais tarde.',
        showConfirmButton: false,
        timer: 3000,
      });

      return;
    }

    if (statusLogin === 'ok') {
      setShowModal(false);
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
    <div className="mainLogin">
      <h1>{isFormRegister ? 'Cadastre-se' : 'Faça seu login'}</h1>
      <form onSubmit={handleSubmit(onSubmit)} id="loginForm">
        {isFormRegister && (
          <Input
            name="firstUserName"
            label="Primeiro nome"
            className="inputFirstUserName"
            control={control}
            render={({ field }) => (
              <div className="containerInputError">
                <input id="firstUserName" type="text" {...field} />
                <span className="error">
                  {errors.firstUserName && errors.firstUserName.message}
                </span>
              </div>
            )}
          />
        )}

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
          {isFormRegister ? (
            <Button
              type="submit"
              className="btn"
              disabled={isSubmitting}
              text={isSubmitting ? 'Cadastrando...' : 'Cadastrar'}
            />
          ) : (
            <>
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
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default UserForm;
