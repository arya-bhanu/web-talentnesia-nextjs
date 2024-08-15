import React, { useState } from 'react';
import Modal from '@/backoffice/components/modal/Modal';
import { Button } from 'flowbite-react/components/Button';

interface FormAddProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (code: string, name: string) => void;
}

const FormAdd: React.FC<FormAddProps> = ({ isOpen, onClose, onSave }) => {
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [hasError, setHasError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code || !name) {
      setHasError(true);
      return;
    }
    onSave(code, name);
    setCode('');
    setName('');
    setHasError(false);
    onClose();
  };

  return (
    <Modal
      state={{ openModal: isOpen, setOpenModal: onClose }}
      title="Add Academic Level"
      handleSubmit={handleSubmit}
    >
      
      <div className="mb-4">
        <label className="text-sm font-medium text-gray-700 flex">
          <span>Code</span>
          <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className={`mt-1 block w-full border ${hasError && !code ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
          placeholder="Input code"
          required
        />
        {hasError && !code && (
          <p className="text-red-500 text-sm mt-1">Code is required.</p>
        )}
      </div>
      <div className="mb-4">
        <label className="text-sm font-medium text-gray-700 flex">
          <span>Academic Level Name</span>
          <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={`mt-1 block w-full border ${hasError && !name ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
          placeholder="Input level name"
          required
        />
        {hasError && !name && (
          <p className="text-red-500 text-sm mt-1">
            Academic Level Name is required.
          </p>
        )}
      </div>
    </Modal>
  );
};

export default FormAdd;
