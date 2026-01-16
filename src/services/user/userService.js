import { api } from '../api.js';
import { checkEmail } from './checkEmail.js';

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
