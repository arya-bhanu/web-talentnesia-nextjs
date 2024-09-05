import React, { useState } from 'react';
import { Modal } from 'flowbite-react';
import { ImportModalView } from './ImportModal.view';
import { studentAPI } from '../../student/api/studentApi';
import { useStatusModalStore } from '@/lib/store';

interface ImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessfulImport: () => void;
}

export const ImportModal: React.FC<ImportModalProps> = ({ isOpen, onClose, onSuccessfulImport }) => {
  const [file, setFile] = useState<File | null>(null);
  const [schoolId, setSchoolId] = useState<string>('');
  const { openModal } = useStatusModalStore();

  const handleFileChange = (selectedFile: File | null) => {
    setFile(selectedFile);
  };

  const handleSchoolChange = (selectedSchoolId: string) => {
    setSchoolId(selectedSchoolId);
  };

  const handleSubmit = async () => {
    if (file && schoolId) {
      try {
        await studentAPI.importStudents(file, schoolId);
        openModal({
          status: 'success',
          action: 'create',
          message: 'Students imported successfully',
        });
        onClose();
        onSuccessfulImport();
      } catch (error) {
        console.error('Error importing students:', error);
        openModal({
          status: 'error',
          message: 'Failed to import students',
        });
      }
    }
  };

  return (
    <Modal show={isOpen} onClose={onClose} size="xl">
      <ImportModalView
        onClose={onClose}
        onFileChange={handleFileChange}
        onSchoolChange={handleSchoolChange}
        onSubmit={handleSubmit}
      />
    </Modal>
  );
};
