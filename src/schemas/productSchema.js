import * as yup from 'yup';

import { requiredField } from './commonSchema.js';

export const productSchema = yup.object({
  name: requiredField(),
  category: requiredField(),
  description: requiredField(),
  price: yup
    .number()
    .required('Preço obrigatório')
    .moreThan(0, 'O valor deve ser maior que zero'),
  qtde: yup
    .number()
    .required('Quantidade obrigatória')
    .moreThan(0, 'O valor deve ser maior que zero'),
  image: yup
    .string()
    .required('Campo é obrigatório')
    .url('Insira um link válido para a imagem'),
});
