
'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Modal } from 'flowbite-react';
import { ModalFormViewProps } from './modalForm.type';
import { FileInputComponent } from '@/backoffice/components/file-input/FileInput';

export const ModalFormView: React.FC<ModalFormViewProps> = ({
  isOpen,
  title,
  formData,
  hasError,
  handleInputChange,
  handleSave,
  onClose,
}) => {
  


  return (
    <Modal show={isOpen} onClose={onClose}>
      <Modal.Header>{title}</Modal.Header>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSave();
        }}
      >
        <Modal.Body>
          <div className="space-y-4">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Certificate name<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Input Certificate name"
                value={formData.name || ''}
                onChange={(e) => handleInputChange('name', e.target.value)}
                required
                className={`block w-full p-2 border ${hasError && !formData.name ? 'border-red-500' : 'border-gray-300'} rounded-lg`}
              />
              {hasError && !formData.name && (
                <p className="text-red-500 text-xs mt-1">Certificate name is required.</p>
              )}
            </div>

          </div>
        </Modal.Body>
        <Modal.Footer className="flex justify-end space-x-2">
          <button
            type="button"
            className="text-red-600 border border-red-600 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-200 rounded-lg px-5 py-2.5 text-center mr-2"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-yellow-500 text-white hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-300 rounded-lg px-5 py-2.5 text-center"
          >
            Save
          </button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};
export default ModalFormView;
