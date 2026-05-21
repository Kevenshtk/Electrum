import { useState, useEffect } from 'react';

import productsService from '../services/product/productService.js';

const useWakeUpAPI = () => {
  const [statusAPI, setStatusAPI] = useState(false);

  useEffect(() => {
    const wakeUpAPI = async () => {
      const result = await productsService.get();

      if (!result.success) {
        alert.errorToast('error', result.message);
        setStatusAPI(false);
        return;
      }

      setStatusAPI(true);
    };

    wakeUpAPI();
  });

  return statusAPI;
};

export default useWakeUpAPI;
