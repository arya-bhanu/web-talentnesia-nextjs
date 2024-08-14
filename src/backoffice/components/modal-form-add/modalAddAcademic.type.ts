
export interface ModalAddAcademicProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (code: string, name: string) => void;
}

export interface ModalAddAcademicLevelViewProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  code: string;
  setCode: (value: string) => void;
  name: string;
  setName: (value: string) => void;
  hasError: boolean;
}
