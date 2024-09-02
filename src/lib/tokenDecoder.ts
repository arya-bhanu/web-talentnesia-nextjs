import jwt from 'jsonwebtoken';
import Cookies from 'js-cookie';

export interface DecodedToken {
  userId: string;
  name: string;
  email: string;
  role: number;
  profilePicture: string;
  isLoggedIn: string;
  token: string;
}

export const decodeToken = (): DecodedToken | null => {
  const cookieData = Cookies.get('talentnesia_token');
  if (cookieData) {
    try {
      const decodedToken = jwt.decode(cookieData) as DecodedToken;
      if (decodedToken && typeof decodedToken === 'object') {
        return decodedToken;
      }
    } catch (error) {
      console.error('Error decoding token');
    }
  }
  return null;
};
