export interface FormData {
  name: string; 
  code: string; 
  active: number
}
export interface ModalFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (id: string | undefined, data: FormData) => Promise<void>;
  initialData?: { name: string; code: string; active: number } | null;
  id?: string;
  title: string;
}

export interface ModalFormViewProps {
  isOpen: boolean;
  title: string;
  formData: { [key: string]: string };
  hasError: boolean;
  handleInputChange: (category: string, value: string) => void;
  handleSave: () => void;
  onClose: () => void;
}