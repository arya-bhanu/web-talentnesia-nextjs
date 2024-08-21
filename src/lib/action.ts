'use server';

import { getIronSession } from 'iron-session';
import { sessionOptions, SessionData, defaultSession } from './lib';
import { cookies } from 'next/headers';

const users = [
  { userId: '4vbyzqky6yb5q0h2', name: 'admin', email: 'admin@example.com', password: 'admin', role: 1 },
  { userId: 'mmf3ga2z7zda2qmd', name: 'operator', email: 'operator@example.com', password: 'operator', role: 2 },
  { userId: 'xwgfok4w1uyf1ym2', name: 'mentor', email: 'mentor@example.com', password: 'mentor', role: 3 },
];

export const getSession = async (): Promise<Partial<SessionData>> => {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  return {
    isLoggedIn: session.isLoggedIn || defaultSession.isLoggedIn,
    userId: session.userId || '',
    name: session.name || '',
    email: session.email || '',
    role: session.role || 0,
  };
};

export const refreshToken = async () => {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);
  
  if (session.isLoggedIn) {
    session.lastActivity = Date.now();
    await session.save();
    return true;
  }
  
  return false;
};

export const login = async (formData: FormData) => {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  const formEmail = formData.get('email') as string;
  const formPassword = formData.get('password') as string;
  const user = users.find(u => u.email === formEmail && u.password === formPassword);

  if (!user) {
    return { error: 'Invalid credentials' };
  }

  session.userId = user.userId;
  session.name = user.name;
  session.email = user.email;
  session.role = user.role;
  session.isLoggedIn = true;

  await session.save();

  const redirectMap: Record<number, string> = {
    1: '/backoffice/example',
    2: '/operator/example',
    3: '/mentor/example'
  };

  return { redirectTo: redirectMap[user.role] || '/' };
};

export const logout = async () => {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);
  await session.destroy();
  return { redirectTo: '/' };
};
