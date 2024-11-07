import { useEffect, useState } from 'react';

export const useFetch = (url: string) => {
  const [data, setData] = useState<undefined | any>(undefined);
  const [loading, setIsLoading] = useState(true);
  const [error, setError] = useState<any>(undefined);
  useEffect(() => {
    fetch(url)
      .then(async (res) => {
        const data = await res.json();
        setData(data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => setIsLoading(false));
  }, [url]);
  return { data, loading, error };
};
