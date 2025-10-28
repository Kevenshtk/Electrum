import { useState, useEffect } from 'react';

import { api } from '../services/api.js';

const useWakeUpAPI = () => {
  const [statusAPI, setStatusAPI] = useState(false);

  useEffect(() => {
    const wakeUpAPI = async () => {
      try {
        await api.get('/products');
        setStatusAPI(true);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
        setStatusAPI(false);
      }
    };

    wakeUpAPI();
  });

  return statusAPI;
}

export default useWakeUpAPI;
