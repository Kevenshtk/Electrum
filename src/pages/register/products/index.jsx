import { useCallback, useContext } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import { ProductsContext } from '../../../context/products.jsx';
import { productSchema } from '../../../schemas/productSchema.js';

import { Input, Select, TextArea } from '../../../components/Input';
import Button from '../../../components/Button';

import './styles.sass';

const ProductsRegister = () => {
  const { addProduct } = useContext(ProductsContext);
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
      const result = await addProduct(data);

      if (!result.success) {
        return;
      }

      reset();
    },
    [addProduct, reset]
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
                <option value="notebook">Notebooks</option>
                <option value="celular">Celulares</option>
                <option value="camera">Câmeras</option>
                <option value="pc-gamer">PC Gamer</option>
                <option value="acessorio">Acessórios</option>
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
