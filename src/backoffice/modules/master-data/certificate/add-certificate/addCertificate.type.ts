export interface FormData {
      name: string;
      file: string;
      active?: number;
}
export interface AddCertificateProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (id: string | undefined, data: FormData) => Promise<void>;
    initialData?: { [key: string]: string } | null;
    id?: string;
    title: string;
  }
  
  export interface AddCertificateViewProps {
    isOpen: boolean;
    title: string;
    formData: {
      name: string;
      file: string;
      active?: number;
    };
    hasError: boolean;
    handleInputChange: (field: string, value: string) => void;
    handleSave: () => void;
    onClose: () => void;
  }