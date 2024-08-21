export interface SessionData {
  userId?: string;
  name?: string;
  email?: string;
  role?: number;
  isLoggedIn?: boolean;
}

export const defaultSession: SessionData = {
  isLoggedIn: false,
}

export const getStoredSession = (): SessionData => {
  if (typeof window !== 'undefined') {
    const storedSession = localStorage.getItem('talentnesia-session');
    return storedSession ? JSON.parse(storedSession) : defaultSession;
  }
  return defaultSession;
}

export const setStoredSession = (session: SessionData) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('talentnesia-session', JSON.stringify(session));
  }
}
