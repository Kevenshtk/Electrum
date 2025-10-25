import { api } from './api';
import { checkEmail } from './userService';
import { fetchLogin } from './loginService';
import { createProduct } from './productService';

jest.mock('./api', () => ({
  api: { get: jest.fn(), post: jest.fn() },
}));

jest.mock('./loginService', () => ({
  fetchLogin: jest.fn(),
}));

describe('Servico de usuário', () => {
  it('deve retornar "ok" se o email não existir', async () => {
    fetchLogin.mockResolvedValue({
      success: true,
      data: [{ email: 'outro@gmail.com' }],
    });

    const result = await checkEmail('novo@gmail.com');
    expect(result).toBe('ok');
  });

  it('deve retornar "errorEmail" se o email já existir', async () => {
    fetchLogin.mockResolvedValue({
      success: true,
      data: [{ email: 'keven@gmail.com' }],
    });

    const result = await checkEmail('keven@gmail.com');
    expect(result).toBe('errorEmail');
  });

  it('deve retornar "errorServer" se o fetchLogin falhar', async () => {
    fetchLogin.mockResolvedValue({
      success: false,
      data: [],
    });

    const result = await checkEmail('qualquer@gmail.com');
    expect(result).toBe('errorServer');
  });
});

describe('Servico de produto', () => {
  const productData = {
    name: 'Mouse Redragon Storm Pro Rgb Sem Fio',
    category: 'Mouses',
    descripiton: 'Mouse Gamer Redragon Storm Pro Rgb Sem Fio Preto',
    price: 215.91,
    image:
      'https://http2.mlstatic.com/D_NQ_NP_632949-MLM50350324305_062022-O.webp',
    tag: 'hot',
  };

  it('deve retornar success: true e os dados do produto criado', async () => {
    const mockResponse = { data: { id: 1, name: 'Mouse Redragon' } };
    api.post.mockResolvedValue(mockResponse);

    const result = await createProduct(productData);
    expect(result.success).toBe(true);
    expect(result.data).toEqual(mockResponse.data);
  });

  it('deve retornar success: false e uma mensagem de erro', async () => {
    const result = await createProduct(productData);
    expect(result.success).toBe(false);
    expect(result.message).toBe('Erro ao tentar criar um produto');
  });
});
