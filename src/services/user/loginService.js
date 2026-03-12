import { api } from '../api.js';

const fetchLogin = async (email, password) => {
  try {
    const response = await api.get('/users');

    const user = response.data.find(
      (user) => user.email === email && user.password === password
    );

    return { success: true, user };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Erro ao buscar informações',
    };
  }
};

export { fetchLogin };
