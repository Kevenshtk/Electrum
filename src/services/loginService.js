import { api } from './api.js';

const fetchLogin = async () => {
  try {
    const responce = await api.get('/users');
    return responce.data;
  } catch (error) {
    return error;
  }
};

export { fetchLogin };
