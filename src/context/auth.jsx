import { createContext, useState } from 'react';

import { fetchLogin } from '../services/user/loginService.js';

import Swal from 'sweetalert2';

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

  const alertToDoLogin = () => {
    Swal.fire({
      position: 'top',
      icon: 'warning',
      title: 'Por favor, faça login para continuar!',
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <AuthContext.Provider
      value={{ currentUser, handleLogin, handleLogout, alertToDoLogin }}
    >
      {children}
    </AuthContext.Provider>
  );
};
