export interface ModalFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (id: string | undefined, data: { name: string }) => Promise<void>;
  initialData?: { name: string } | null;
  id?: string;
  title: string;
}

export interface ModalFormViewProps {
  isOpen: boolean;
  title: string;
  formData: { name: string };
  hasError: boolean;
  handleInputChange: (name: string, value: string) => void;
  handleSave: () => void;
  onClose: () => void;
}