import { fetchLogin } from '../loginService.js';

export const checkEmail = async (email) => {
  const users = await fetchLogin();

  if (!users.success) {
    return users;
  }

  const user = users.data.find((user) => user.email === email);

  if (user) {
    return { success: true, emailExists: true };
  }

  return { success: true, emailExists: false };
};
