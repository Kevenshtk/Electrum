import Button from '../../../components/Button';
import Input from '../../../components/Input';

import Swal from 'sweetalert2';

import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { createProduct } from '../../../services/productService.js';

import './styles.sass';

const schema = yup.object({
  name: yup.string().required('Este campo é obrigatório'),
  category: yup.string().required('Selecione uma categoria'),
  description: yup.string().required('Este campo é obrigatório'),
  price: yup
    .number()
    .required('Este campo é obrigatório')
    .moreThan(0, 'O preço deve ser maior que zero'),
  qtde: yup.number().required('Este campo é obrigatório'),
  image: yup
    .string()
    .required('Este campo é obrigatório')
    .url('Insira um link válido para a imagem'),
});

const ProductsRegister = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues: {
      name: '',
      category: '',
      description: '',
      qtde: 1,
      price: 0.0,
      image: '',
      tag: 'new',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = useCallback(
    async (data) => {
      try {
        await createProduct(data);
        Swal.fire({
          position: 'top',
          icon: 'success',
          title: 'Produto cadastrado com sucesso!',
          showConfirmButton: false,
          timer: 1500,
        });

        reset();
      } catch (error) {
        Swal.fire({
          position: 'top',
          icon: 'error',
          title: 'Erro ao cadastrar o produto!',
          text: 'Tente novamente mais tarde.',
          showConfirmButton: false,
          timer: 3000,
        });
        console.error('Erro ao cadastrar produto:', error);
      }
    },
    [reset]
  );

  return (
    <main>
      <h1>Cadastro de produtos</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        id="productsRegisterForm"
        className={isSubmitting ? 'disabled' : ''}
      >
        <div className="containerInputsRow">
          <Input
            name="name"
            label="Nome"
            className="inputName"
            control={control}
            render={({ field }) => (
              <div className="containerInputError">
                <input
                  id="name"
                  type="text"
                  placeholder="Nome do Produto"
                  {...field}
                />
                <span className="error">
                  {errors.name && errors.name.message}
                </span>
              </div>
            )}
          />

          <Input
            name="category"
            label="Cateroria"
            className="inputCategory"
            control={control}
            render={({ field }) => (
              <div className="containerInputError">
                <select id="category" {...field}>
                  <option value=""></option>
                  <option value="Notebooks">Notebooks</option>
                  <option value="Celulares">Celulares</option>
                  <option value="Câmeras">Câmeras</option>
                  <option value="PC Gamer">PC Gamer</option>
                  <option value="Acessórios">Acessórios</option>
                </select>
                <span className="error">
                  {errors.category && errors.category.message}
                </span>
              </div>
            )}
          />
        </div>

        <Input
          name="description"
          label="Descrição"
          className="inputDescription"
          control={control}
          render={({ field }) => (
            <div className="containerInputError">
              <textarea id="description" rows="5" {...field}></textarea>
              <span className="error">
                {errors.description && errors.description.message}
              </span>
            </div>
          )}
        />

        <div className="containerInputsRow">
          <Input
            name="price"
            label="Preço"
            className="inputPrice"
            control={control}
            render={({ field }) => (
              <div className="containerInputError">
                <input
                  id="price"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="Preço do Produto"
                  {...field}
                />
                <span className="error">
                  {errors.price && errors.price.message}
                </span>
              </div>
            )}
          />

          <Input
            name="qtde"
            label="Quantidade"
            className="inputQtde"
            control={control}
            render={({ field }) => (
              <div className="containerInputError">
                <input
                  id="qtde"
                  type="number"
                  min="0"
                  step="1"
                  placeholder="Qtde"
                  {...field}
                />
                <span className="error">
                  {errors.qtde && errors.qtde.message}
                </span>
              </div>
            )}
          />

          <Input
            name="tag"
            label="Tag"
            className="inputTag"
            control={control}
            render={({ field }) => (
              <select id="tag" {...field}>
                <option value="new">New</option>
                <option value="hot">Hot</option>
                <option value="promo">Promo</option>
              </select>
            )}
          />
        </div>

        <Input
          name="image"
          label="Imagem"
          className="inputImage"
          control={control}
          render={({ field }) => (
            <div className="containerInputError">
              <input
                id="image"
                type="text"
                placeholder="Inserir o link da imagem"
                {...field}
              />
              <span className="error">
                {errors.image && errors.image.message}
              </span>
            </div>
          )}
        />

        <Button
          type="submit"
          className="btn"
          disabled={isSubmitting}
          text={isSubmitting ? 'Enviando...' : 'Cadastrar produto'}
        />
      </form>
    </main>
  );
};

export default ProductsRegister;
