import * as yup from 'yup';

export const requiredField = (msg = 'Campo obrigatório') =>
  yup.string().required(msg);

export const emailField = () =>
  yup.string().email('Informe um email válido').required('Email obrigatório');

export const passwordField = () =>
  yup
    .string()
    .min(6, 'A senha deve possuir no mínimo 6 caracteres')
    .required('Senha obrigatória');
