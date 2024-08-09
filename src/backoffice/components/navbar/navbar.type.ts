export interface User {
  name: string;
  email: string;
  profilePicture: string;
}

export interface NavbarState {
  user: User;
  isMenuOpen: boolean;
}
