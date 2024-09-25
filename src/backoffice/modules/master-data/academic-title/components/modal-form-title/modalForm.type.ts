import { APIResponseAcademicTitle } from "../../academicTitle.type";

export interface FormData {
  name: string;
  [key: string]: string;
}
export interface ModalFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (id: string | undefined, data: APIResponseAcademicTitle) => Promise<void>;
  initialData?: { [key: string]: string } | null;
  id?: string;
  title: string;
}

export interface ModalFormViewProps {
  isOpen: boolean;
  title: string;
  formData: { [key: string]: string };
  hasError: boolean;
  handleInputChange: (name: string, value: string) => void;
  handleSave: () => void;
  onClose: () => void;
}
