export interface RegisterViewProps {
  showPassword: boolean;
  togglePasswordVisibility: () => void;
  onSubmit: (firstName: string, lastName: string, email: string, password: string) => void;
  error: string | null;
  token: string;
}
