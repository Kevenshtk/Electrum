import { fetchLogin } from '../loginService.js';

export const checkEmail = async (email) => {
  try {
    const users = await fetchLogin();

    if (users.success) {
      const user = users.data.find((user) => user.email === email);

      if (user) return 'errorEmail';

      return 'ok';
    }
  } catch (error) {
    return 'errorServer';
  }
};
