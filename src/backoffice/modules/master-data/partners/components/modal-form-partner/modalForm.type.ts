export interface ModalFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (id: string | undefined, data: PartnerFormData) => Promise<void>;
  initialData?: { [key: string]: string } | null;
  id?: string;
  title: string;
}
export interface PartnerFormData {
  name: string;
  address: string;
  logo: string;
  description: string;
}
export interface ModalFormViewProps {
  isOpen: boolean;
  title: string;
  formData: { [key: string]: string };
  hasError: boolean;
  handleInputChange: (partner: string, value: string) => void;
  handleSave: () => void;
  onClose: () => void;
}

export type FileInputComponentProps = {
  id: string;
  label: string;
  onFileChange: (field: string, value: string,) => void;
};
