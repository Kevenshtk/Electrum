import { createContext, useState } from 'react';

import { fetchLogin } from '../services/user/loginService.js';

export const AuthContext = createContext();

const initialUserState = {
  status: false,
  email: '',
  name: '',
  id: 0,
}

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(initialUserState);

  const handleLogin = async (email, password) => {
    const users = await fetchLogin();

    if (!users.success) {
      return 'errorServer';
    }

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
  };

  const handleLogout = () => {
    setCurrentUser(initialUserState);
  };

  return (
    <AuthContext.Provider value={{ currentUser, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};
