import { backOfficeAPI } from '@/lib/axiosConfig';

export const loginApi = async (email: string, password: string, userName: string, firstName: string, lastName: string, token: string) => {
  try {
    const response = await backOfficeAPI.post(`/v1/auth/register?token=${token}`, {
      userName,
      firstName,
      lastName,
      email,
      password,
      educationInstitutionId: token
    });
    return response.data;
  } catch (error) {
    console.error('Register API error:', error);
    throw error;
  }
};

