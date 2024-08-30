import axios from 'axios';

export const getAuthToken = async (): Promise<string> => {
  const tokenRes = await axios<{ isLoggedIn: boolean; token: string }>(
    '/api/auth/token',
  );
  return tokenRes.data.token;
};

export const refreshAuthToken = async (): Promise<string> => {
  const res = await axios<{ success: boolean; apiToken: string }>(
    '/api/auth/refreshToken',
  );
  if (!res.data.success) throw new Error('Token refresh failed');
  return res.data.apiToken;
};
