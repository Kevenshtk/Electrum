import { api } from '../api.js';
import { checkEmail } from './checkEmail.js';

export const registerUser = async (userData) => {
  const { success, emailExists } = await checkEmail(userData.email);

  if (!success) {
    return { success: false, message: 'Erro ao verificar email' };
  }

  if (emailExists) {
    return { success: true, emailExists: true };
  }

  try {
    await api.post(
      '/users',
      {
        username: userData.firstUserName,
        email: userData.email,
        password: userData.password,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    return { success: true };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Erro ao registrar usuário',
      status: error.response?.status || 500,
    };
  }
};
