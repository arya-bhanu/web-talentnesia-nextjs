import { SessionOptions } from 'iron-session'

export interface SessionData {
  userId?: string;
  name?: string;
  email?: string;
  password?: string;
  role?: number;
  profilePicture?: string;
  isLoggedIn?: boolean;
}

export const defaultSession: SessionData = {
  isLoggedIn: false,
}

export const sessionOptions: SessionOptions = {
  password: process.env.SESSION_PASSWORD!,
  cookieName: "talentnesia-session",
  cookieOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  },
}