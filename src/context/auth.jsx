import { createContext, useState, useEffect } from 'react';

import { fetchLogin } from '../services/user/loginService.js';

export const AuthContext = createContext();

const initialUserState = {
  status: false,
  email: '',
  name: '',
  id: 0,
};

const loginStatus = {
  OK: 'ok',
  FAILED: 'failed',
  SERVER_ERROR: 'server_error',
};

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem('currentUser');

    if (!savedUser) {
      return initialUserState;
    }

    return JSON.parse(savedUser);
  });

  useEffect(() => {
    if (currentUser.status) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('currentUser');
    }
  }, [currentUser]);

  const handleLogin = async (email, password) => {
    const result = await fetchLogin(email, password);

    if (!result.success) {
      return loginStatus.SERVER_ERROR;
    }

    if (result.user) {
      const user = {
        status: true,
        email,
        name: result.user.username,
        id: result.user.id,
      };

      setCurrentUser(user);

      return loginStatus.OK;
    } else {
      return loginStatus.FAILED;
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
