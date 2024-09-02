import React from 'react';
import { Modal } from 'flowbite-react';
import { ImportModalView } from './ImportModal.view';

interface ImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (file: File) => void;
}

export const ImportModal: React.FC<ImportModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [file, setFile] = React.useState<File | null>(null);

  const handleFileChange = (selectedFile: File | null) => {
    setFile(selectedFile);
  };

  const handleSubmit = () => {
    if (file) {
      onSubmit(file);
    }
  };

  return (
    <Modal show={isOpen} onClose={onClose} size="xl">
      <ImportModalView
        onClose={onClose}
        onFileChange={handleFileChange}
        onSubmit={handleSubmit}
      />
    </Modal>
  );
};
