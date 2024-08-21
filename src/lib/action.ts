import { SessionData, generateToken, setToken, removeToken, getSessionData } from './lib';

const users = [
  { userId: '4vbyzqky6yb5q0h2', name: 'admin', email: 'admin@example.com', password: 'admin', role: 1 },
  { userId: 'mmf3ga2z7zda2qmd', name: 'operator', email: 'operator@example.com', password: 'operator', role: 2 },
  { userId: 'xwgfok4w1uyf1ym2', name: 'mentor', email: 'mentor@example.com', password: 'mentor', role: 3 },
];

export const login = (formData: FormData) => {
  const formEmail = formData.get('email') as string;
  const formPassword = formData.get('password') as string;
  const user = users.find(u => u.email === formEmail && u.password === formPassword);

  if (!user) {
    return { error: 'Invalid credentials' };
  }

  const sessionData: SessionData = {
    userId: user.userId,
    name: user.name,
    email: user.email,
    role: user.role,
    isLoggedIn: true,
  };

  const token = generateToken(sessionData);
  setToken(token);

  const redirectMap: Record<number, string> = {
    1: '/backoffice/example',
    2: '/operator/example',
    3: '/mentor/example'
  };

  return { redirectTo: redirectMap[user.role] || '/' };
};

export const logout = () => {
  removeToken();
  return { redirectTo: '/' };
};

export const getSession = (): SessionData | null => {
  return getSessionData();
};
