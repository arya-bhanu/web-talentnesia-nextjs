import React from 'react';
import { Modal } from 'flowbite-react';
import { ModalFormViewProps } from './modalForm.type';
import { InputDropdown } from '@/backoffice/components/input-dropdown';

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
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Code<label className="text-red-500">*</label>
              </label>
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
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Level name<label className="text-red-500">*</label>
              </label>
              <input
                type="text"
                placeholder="Input category name"
                value={formData.level || ''}
                onChange={(e) => handleInputChange('level', e.target.value)}
                required
                className={`block w-full p-2 border ${hasError && !formData.level ? 'border-red-500' : 'border-gray-300'} rounded-lg`}
              />
              {hasError && !formData.level && (
                <p className="text-red-500 text-xs mt-1">
                  Level name is required.
                </p>
              )}
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Status<label className="text-red-500">*</label>
              </label>
              <InputDropdown
                value={formData.status || ''}
                onChange={(value) => handleInputChange('status', value)}
                options={['Active', 'Non Active']}
              />

              {hasError && !formData.status && (
                <><p className="text-red-500 text-xs mt-1">
                  Status is required.
                </p><p className="text-red-500 text-xs mt-1">level name is required.</p></>
              )}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className='flex justify-end space-x-2'>
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
