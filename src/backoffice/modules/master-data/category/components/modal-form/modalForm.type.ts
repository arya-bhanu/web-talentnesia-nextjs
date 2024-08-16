export interface ModalFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (id: string | undefined, data: any) => Promise<void>;
  initialData?: { [key: string]: string } | null;
  id?: string;
  title: string;
  fields: Array<{ name: string; label: string }>;
}

export interface ModalFormViewProps {
  isOpen: boolean;
  title: string;
  fields: Array<{ name: string; label: string }>;
  formData: { [key: string]: string };
  hasError: boolean;
  handleInputChange: (name: string, value: string) => void;
  handleSave: () => void;
  onClose: () => void;
}