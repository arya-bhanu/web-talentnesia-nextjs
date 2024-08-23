export interface User {
  userId: string;
  name: string;
  email: string;
  role: number;
  profilePicture?: string;
}

export interface NavbarState {
  user: User;
  isMenuOpen: boolean;
}
