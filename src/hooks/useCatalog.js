import { useCallback, useEffect, useState } from 'react';
import { fetchProducts } from '../services/products.js';

export default function useCatalog() {
  const [result, setResult] = useState({ products: [], status: 'loading' });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    let disposed = false;
    const timeout = setTimeout(() => controller.abort(), 15000);

    fetchProducts(controller.signal)
      .then(products => {
        if (!disposed) setResult({ products, status: 'ready' });
      })
      .catch(() => {
        if (!disposed) setResult({ products: [], status: 'error' });
      })
      .finally(() => clearTimeout(timeout));

    return () => {
      disposed = true;
      clearTimeout(timeout);
      controller.abort();
    };
  }, [attempt]);

  const retry = useCallback(() => {
    setResult({ products: [], status: 'loading' });
    setAttempt(current => current + 1);
  }, []);

  return { ...result, retry };
}
