import { api } from './api.js';

const fetchLogin = async () => {
  try {
    const responce = await api.get('/login');
    return responce.data;
  } catch (error) {
    return error;
  }
};

const loginValidation = async (email, password) => {
  const data = await fetchLogin();

  if (!data) return 'error';

  const loginValid = data.find(
    (loginDate) => loginDate.email === email && loginDate.password === password
  );

  return loginValid ? 'success' : 'failed';
};

const getUserName = async (email) => {
  const data = await fetchLogin();

  if (!data) return 'error';

  const dataUser = data.find(
    (loginDate) => loginDate.email === email
  );

  return dataUser.username;
};

export { loginValidation, getUserName };
