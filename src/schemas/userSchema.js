import * as yup from 'yup';

import { emailField, passwordField } from './commonSchema.js';

export const registerSchema = yup.object({
  firstUserName: yup
    .string()
    .required('O primeiro nome é obrigatório')
    .min(2, 'O campo deve ter pelo menos 2 caracteres'),
  email: emailField(),
  password: passwordField(),
});

export const loginSchema = yup.object({
    email: emailField(),
    password: passwordField(),
});
