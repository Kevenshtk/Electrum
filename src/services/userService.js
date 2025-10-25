import { api } from './api.js';
import { fetchLogin } from './loginService.js';

export const checkEmail = async (email) => {
  const users = await fetchLogin();

  switch (users.success) {
    case true:
      const user = users.data.find((user) => user.email === email);

      if (user) {
        return 'errorEmail';
      } else {
        return 'ok';
      }
      break;

    default:
      return 'errorServer';
      break;
  }
};

export const registerUser = async (userData) => {
  const emailExists = await checkEmail(userData.email);

  switch (emailExists) {
    case 'ok':
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

        return 'ok';
      } catch (error) {
        return 'errorServer';
      }
      break;

    case 'errorEmail':
      return 'errorEmail';
      break;

    default:
      return 'errorServer';
      break;
  }
};
