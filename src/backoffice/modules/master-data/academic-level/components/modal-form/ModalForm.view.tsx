import React from 'react';
import { Modal } from 'flowbite-react';
import { ModalFormViewProps } from './modalForm.type';

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
      <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
        <Modal.Body>
          <div className="space-y-4">
            <div>
              <label className="border-none block mb-2 text-sm font-medium text-gray-900">Code*</label>
              <input
                type="text"
                placeholder="Input code"
                value={formData.code || ''}
                onChange={(e) => handleInputChange('code', e.target.value)}
                required
                className={`block w-full p-2 border ${hasError && !formData.code ? 'border-red-500' : 'border-gray-300'} rounded-lg`}
              />
              {hasError && !formData.code && (
                <p className="text-red-500 text-xs mt-1">Code is required.</p>
              )}
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">Academic Level Name*</label>
              <input
                type="text"
                placeholder="Input level name"
                value={formData.name || ''}
                onChange={(e) => handleInputChange('name', e.target.value)}
                required
                className={`block w-full p-2 border ${hasError && !formData.name ? 'border-red-500' : 'border-gray-300'} rounded-lg`}
              />
              {hasError && !formData.name && (
                <p className="text-red-500 text-xs mt-1">Academic Level Name is required.</p>
              )}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
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
