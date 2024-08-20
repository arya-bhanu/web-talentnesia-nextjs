'use server';

import { getIronSession } from 'iron-session';
import { sessionOptions, SessionData, defaultSession } from './lib';
import { cookies } from 'next/headers';

const users = [
  {
    userId: '1',
    name: 'admin',
    email: 'admin@example.com',
    password: 'admin',
    role: 1,
    isLoggedIn: false,
  },
  {
    userId: '2',
    name: 'operator',
    email: 'operator@example.com',
    password: 'operator',
    role: 2,
    isLoggedIn: false,
  },
  {
    userId: '3',
    name: 'mentor',
    email: 'mentor@example.com',
    password: 'mentor',
    role: 3,
    isLoggedIn: false,
  },
];

export const getSession = async () => {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  if (!session.isLoggedIn) {
    session.isLoggedIn = defaultSession.isLoggedIn;
  }
  return session;
};

export const login = async (formData: FormData) => {
  const session = await getSession();

  const formEmail = formData.get('email') as string;
  const formPassword = formData.get('password') as string;
  const user = users.find(
    (u) => u.email === formEmail && u.password === formPassword,
  );

  if (!user) {
    console.log('Wrong Credentials');
    return { error: 'Wrong Credentials' };
  }

  session.userId = user.userId;
  session.name = user.name;
  session.email = user.email;
  session.password = user.password;
  session.role = user.role;
  session.isLoggedIn = true;

  await session.save();

  if (user.role === 1) {
    return { redirectTo: '/backoffice/example' };
  } else if (user.role === 2) {
    return { redirectTo: '/operator/example' };
  } else if (user.role === 3) {
    return { redirectTo: '/mentor/example' };
  } else {
    return { redirectTo: '/' };
  }
};

export const logout = async () => {
  const session = await getSession();
  session.destroy();
  return { redirectTo: '/' };
};
