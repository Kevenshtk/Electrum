import { createContext, useState } from 'react';

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
  const [currentUser, setCurrentUser] = useState(initialUserState);

  const handleLogin = async (email, password) => {
    const result = await fetchLogin(email, password);

    if (!result.success) {
      return loginStatus.SERVER_ERROR;
    }

    if (result.user) {
      setCurrentUser({
        status: true,
        email: email,
        name: result.user.username,
        id: result.user.id,
      });

      return loginStatus.OK;
    } else {
      return loginStatus.FAILED;
    }
  };

  const handleLogout = () => {
    setCurrentUser(initialUserState);
  };

  return (
    <AuthContext.Provider
      value={{ currentUser, handleLogin, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
