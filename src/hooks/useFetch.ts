import { useState } from 'react';
import { UseFetchProps, fetchAxios } from '../lib/fetchAxios';

export function useFetch<T>({
  url,
  method,
  formData,
  params,
  initialFetch = true,
}: UseFetchProps) {
  const [data, setData] = useState<T>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchDataAsync = async (
    config?: Partial<UseFetchProps>,
    append: boolean = false,
  ) => {
    setIsLoading(true);
    try {
      const response = await fetchAxios<T>({
        url,
        method,
        formData: config?.formData || formData,
        params: config?.params || params,
      });

      setData((prev: T | undefined) =>
        append && Array.isArray(prev)
          ? ([...(prev || [])] as T | undefined)
          : (response as T | undefined),
      );
    } catch (err) {
      // setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (initialFetch) {
    fetchDataAsync();
  }

  const refreshData = (
    config?: Partial<UseFetchProps>,
    append: boolean = false,
  ) => {
    fetchDataAsync(config, append);
  };

  return {
    data,
    isLoading,
    error,
    refreshData,
  };
}
