import { FAQItem } from '../../faq.type';

export interface ModalFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (id: string | undefined, data: any) => Promise<void>;
  initialData?: FAQItem | null;
  id?: string;
  title: string;
}
  
  export interface ModalFormViewProps {
    isOpen: boolean;
    title: string;
    formData: { [key: string]: string };
    hasError: boolean;
    handleInputChange: (field: string, value: string) => void;
    handleSave: () => void;
    onClose: () => void;
  }
  