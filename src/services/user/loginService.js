import { api } from '../api.js';

const fetchLogin = async () => {
  try {
    const response = await api.get('/users');
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      message:
        error.response?.data?.message || 'Erro ao buscar informações',
    };
  }
};

export { fetchLogin };
