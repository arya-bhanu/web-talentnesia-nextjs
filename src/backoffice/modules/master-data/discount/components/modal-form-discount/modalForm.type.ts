// modalForm.type.ts
export interface FormDataDisc {
    name: string;
    persentage: number;
    code: string;
    startDate: string;
    endDate: string;
    active?: number; 
}

export interface ModalFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (id: string | undefined, data: FormDataDisc) => Promise<void>;
  initialData?: {
    name: string;
    persentage: number;
    code: string;
    startDate: string;
    endDate: string;
    active?: number; 
  } | null;
  id?: string;
  title: string;
}

export interface ModalFormViewProps {
  isOpen: boolean;
  title: string;
  formData: {
    name: string;
    persentage: number;
    code: string;
    startDate: string;
    endDate: string;
    active: number; 
  };
  hasError: boolean;
  handleInputChange: (field: string, value: string | number | boolean) => void; 
  handleSave: () => void;
  onClose: () => void;
}
