import { backOfficeAPI } from '@/lib/axiosConfig';

export const loginApi = async (email: string, password: string) => {
  try {
    const response = await backOfficeAPI.post('/v1/auth/login', {
      email,
      password
    });
    return response.data;
  } catch (error) {
    console.error('Login API error:', error);
    return null;
  }
};
