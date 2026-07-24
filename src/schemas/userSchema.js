import * as yup from 'yup';

import { emailField, passwordField } from './commonSchema.js';

export const registerSchema = yup.object({
  firstUserName: yup
    .string()
    .min(3, 'O campo deve ter pelo menos 3 caracteres')
    .required('O primeiro nome é obrigatório'),
  email: emailField(),
  password: passwordField(),
});

export const loginSchema = yup.object({
    email: emailField(),
    password: passwordField(),
});
