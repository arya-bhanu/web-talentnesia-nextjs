import jwt from 'jsonwebtoken';
import Cookies from 'js-cookie';

export interface SessionData {
  userId?: string;
  name?: string;
  email?: string;
  role?: number;
  isLoggedIn?: boolean;
}

const JWT_SECRET = 'your_secret_key_here';
const TOKEN_NAME = 'talentnesia_token';

export const generateToken = (payload: SessionData): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
};

export const verifyToken = (token: string): SessionData | null => {
  try {
    return jwt.verify(token, JWT_SECRET) as SessionData;
  } catch (error) {
    return null;
  }
};

export const setToken = (token: string): void => {
  Cookies.set(TOKEN_NAME, token, { expires: 1/24, secure: true, sameSite: 'strict' });
};

export const getToken = (): string | undefined => {
  return Cookies.get(TOKEN_NAME);
};

export const removeToken = (): void => {
  Cookies.remove(TOKEN_NAME);
};

export const getSessionData = (): SessionData | null => {
  const token = getToken();
  if (token) {
    return verifyToken(token);
  }
  return null;
};

export const authenticatedFetch = async (url: string, options: RequestInit = {}): Promise<Response> => {
  const token = getToken();
  if (!token) {
    throw new Error('No token found');
  }

  const headers = new Headers(options.headers);
  headers.append('Authorization', `Bearer ${token}`);

  const response = await fetch(url, { ...options, headers });
  if (response.status === 401) {
    removeToken();
    window.location.href = '/login';
  }
  return response;
};
