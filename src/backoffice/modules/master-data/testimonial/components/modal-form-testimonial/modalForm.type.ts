import { TestimonialRequest, Testimonial } from "../../testimonial.type";


export interface ModalFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (id: string | undefined, data: TestimonialRequest) => Promise<void>;
  initialData?: Testimonial | null;
  id?: string;
  title: string;
}

export interface ModalFormViewProps {
  isOpen: boolean;
  title: string;
  formData: {
    code: string;
    name: string;
    description: string;
    active: number;
    userId: string;
  };
  handleInputChange: (name: string, value: string) => void;
  handleSave: () => void;
  onClose: () => void;
  isEditMode: boolean;
}
