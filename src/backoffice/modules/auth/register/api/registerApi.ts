import { backOfficeAPI } from '@/lib/axiosConfig';

export const loginApi = async (email: string, password: string, userName: string, firstName: string, lastName: string) => {
  try {
    const response = await backOfficeAPI.post('/v1/auth/register', {
     userName,
     firstName,
     lastName, 
     email,
      password
    });
    return response.data;
  } catch (error) {
    console.error('Register API error:', error);
    return null;
  }
};
