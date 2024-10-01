export interface LogoutModalProps {
  show: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
}
