export interface AcademicLevelFormData {
  name: string;
}

export interface ModalFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (id: string | undefined, data: AcademicLevelFormData) => Promise<void>;
  initialData?: AcademicLevelFormData | null;
  id?: string;
  title: string;
}

export interface ModalFormViewProps {
  isOpen: boolean;
  title: string;
  formData: AcademicLevelFormData;
  hasError: boolean;
  handleInputChange: (name: keyof AcademicLevelFormData, value: string) => void;
  handleSave: () => void;
  onClose: () => void;
}
