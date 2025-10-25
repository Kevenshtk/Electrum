import { createContext, useState } from 'react';

import { fetchLogin } from '../services/loginService.js';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({
    status: false,
    email: '',
    name: '',
    id: 0,
  });

  const handleLogin = async (email, password) => {
    const users = await fetchLogin();

    switch (users.success) {
      case false:
        return 'errorServer';
        break;

      default:
        const user = users.data.find(
          (user) => user.email === email && user.password === password
        );

        if (user) {
          setCurrentUser({
            status: true,
            email: email,
            name: user.username,
            id: user.id,
          });

          return 'ok';
        } else {
          return 'falied';
        }
        break;
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser, handleLogin }}>
      {children}
    </AuthContext.Provider>
  );
};
