import jwt from 'jsonwebtoken';
import { loginApi } from '@/backoffice/modules/auth/login/api/loginApi';
import { getAuthToken } from './auth';
import { SessionData, generateToken, setToken, removeToken, getSessionData, getToken, verifyToken } from './lib';
import Cookies from 'js-cookie';

const JWT_SECRET = 'your_secret_key_here';

const staticUsers = [
  { userId: '', name: 'admin', email: 'admin@example.com', password: 'admin', role: 1, profilePicture: '' },
  { userId: 'mmf3ga2z7zda2qmd', name: 'operator', email: 'operator@example.com', password: 'operator', role: 2, profilePicture: '', educationInstitutionId: '' },
  { userId: 'xwgfok4w1uyf1ym2', name: 'mentor', email: 'mentor@example.com', password: 'mentor', role: 3, profilePicture: '', educationInstitutionId: '' },
];

export const login = async (data: { email: string; password: string }) => {
  const { email, password } = data;

  const apiResponse = await loginApi(email, password);
  if (apiResponse && apiResponse.success) {
    const userData = apiResponse.data;
    
    const sessionData: SessionData = {
      userId: userData.id,
      name: userData.name,
      email: userData.email,
      profilePicture: userData.profilePicture || '',
      role: userData.role,
      isLoggedIn: true,
      educationInstitutionId: userData.educationInstitutionId,
      token: userData.token,
    };

    const token = generateToken(sessionData);
    setToken(token);
  
    const redirectMap: Record<number, string> = {
      1: '/backoffice/dashboard',
      2: '/operator/dashboard',
      3: '/mentor/dashboard',
      4: '/student/dashboard'
    };
  
    return { redirectTo: redirectMap[sessionData.role] || '/' };
  }

  // If API login fails, try static login
  const staticUser = staticUsers.find(u => u.email === email && u.password === password);
  if (staticUser) {
    const sessionData: SessionData = {
      userId: staticUser.userId,
      name: staticUser.name,
      email: staticUser.email,
      profilePicture: staticUser.profilePicture,
      role: staticUser.role,
      isLoggedIn: true,
      educationInstitutionId: staticUser.educationInstitutionId,
    };
    const token = generateToken(sessionData);
    setToken(token);

    const redirectMap: Record<number, string> = {
      1: '/backoffice/dashboard',
      2: '/operator/dashboard',
      3: '/mentor/dashboard'
    };
    return { redirectTo: redirectMap[staticUser.role] || '/' };
  }

  // If both fail, return error
  return { error: 'Invalid credentials' };
};export const getUserData = () => {
  const token = getToken();
  if (token) {
    const decoded = verifyToken(token);
    if (decoded) {
      return decoded;
    }
  }
  return null;
};

export const logout = () => {
  removeToken();
  return { redirectTo: '/' };
};

export const getSession = (): SessionData | null => {
  return getSessionData();
};
