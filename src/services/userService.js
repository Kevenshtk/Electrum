import { api } from './api.js';
import { fetchLogin } from './loginService.js';

const registerUser = async (userData) => {
  const users = await fetchLogin();

  if(users){
    const user = users.find((user) => user.email === userData.email);

    if (user) {
      return 'errorEmail';
    }
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

    return 'ok';
  } catch (error) {
    return 'errorServer';
  }
};

export { registerUser };
