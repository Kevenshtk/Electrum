import { api } from '../api.js';

export const getEmailExists = async (email) => {
  try {
    const response = await api.get('/users');

    return{success: true, data: response.data};
  } catch (error) {
    return { success: false, message: error.message || 'Erro ao buscar informações' };
  }
}

export const checkEmail = async (email) => {
  const result = await getEmailExists(email);

  if (!result.success) return { success: false, emailExists: null };

  const user = result.data.find((user) => user.email === email);

  if (user) {
    return { success: true, emailExists: true };
  }

  return { success: true, emailExists: false };
};
