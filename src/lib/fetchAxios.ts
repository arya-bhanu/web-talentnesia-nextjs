import axios, { AxiosRequestConfig, isAxiosError } from 'axios';
import { getAuthToken, getToken, refreshAuthToken } from './auth';

export interface UseFetchProps {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  token?: string;
  params?: { [key: string]: any };
  formData?: FormData | string | { [key: string]: any };
  initialFetch?: boolean;
}

export const fetchAxios = async <T = any>({
  url,
  method,
  params,
  formData,
  token,
}: UseFetchProps): Promise<T> => {
  // token = token || (await getAuthToken());
  token = token || getToken()?.token;

  const config: AxiosRequestConfig = {
    method,
    url: `${process.env.API_SERVER_URL}${url}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params,
    data: formData,
  };

  try {
    const response = await axios<T>(config);
    return response.data;
  } catch (error: any) {
    if (isAxiosError(error) && error.response?.status === 401) {
      const newToken = await refreshAuthToken();
      if (config.headers) {
        config.headers.Authorization = `Bearer ${newToken}`;
      } else {
        config.headers = {
          Authorization: `Bearer ${newToken}`,
        };
      }
      const retryResponse = await axios<T>(config);
      return retryResponse.data;
    }
    throw error;
  }
};
