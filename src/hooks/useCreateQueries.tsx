import { useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

const useCreateQueries = () => {
  const searchParams = useSearchParams();
  const createQueryString = useCallback(
    (params: { [key: string]: string }[]) => {
      const queryParams = new URLSearchParams(searchParams.toString());
      params.forEach((param) => {
        Object.keys(param).forEach((key) => {
          queryParams.set(key, param[key]);
        });
      });
      return queryParams.toString();
    },
    [searchParams],
  );
  return createQueryString;
};

export default useCreateQueries;
