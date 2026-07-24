import { useCallback } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import productsService from '../../../services/product/productService.js';
import { productSchema } from '../../../schemas/productSchema.js';

import alert from '../../../utils/alert.js';

import { Input, Select, TextArea } from '../../../components/Input';
import Button from '../../../components/Button';

import './styles.sass';

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
    resolver: yupResolver(productSchema),
  });

  const onSubmit = useCallback(
    async (data) => {
      const result = await productsService.add(data);

      if (!result.success) {
        alert.error('info', result.message, 'Tente novamente mais tarde.');
        return;
      }

      alert.success('Produto cadastrado com sucesso!');
      reset();
    },
    [reset]
  );

  return (
    <main className="mainRegisterProducts">
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
            errors={errors}
          />

          <Select
            name="category"
            label="Cateroria"
            className="inputCategory"
            control={control}
            options={
              <>
                <option value=""></option>
                <option value="Notebooks">Notebooks</option>
                <option value="Smartphones">Celulares</option>
                <option value="Câmeras">Câmeras</option>
                <option value="PC-Gamer">PC Gamer</option>
                <option value="Acessórios">Acessórios</option>
              </>
            }
            errors={errors}
          />
        </div>

        <TextArea
          name="description"
          label="Descrição"
          className="inputDescription"
          control={control}
          errors={errors}
        />

        <div className="containerInputsRow">
          <Input
            name="price"
            label="Preço"
            type="number"
            step="0.01"
            className="inputPrice"
            control={control}
            errors={errors}
          />

          <Input
            name="qtde"
            label="Quantidade"
            type="number"
            step="1"
            className="inputQtde"
            control={control}
            errors={errors}
          />

          <Select
            name="tag"
            label="Tag"
            className="inputTag"
            control={control}
            options={
              <>
                <option value="new">New</option>
                <option value="hot">Hot</option>
                <option value="promo">Promo</option>
              </>
            }
          />
        </div>

        <Input
          name="image"
          label="Imagem"
          className="inputImage"
          control={control}
          errors={errors}
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
