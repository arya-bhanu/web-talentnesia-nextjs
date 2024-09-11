import React from 'react';
import { Modal } from 'flowbite-react';
import { ModalFormViewProps } from './modalForm.type';
import Dropdown from '@/backoffice/components/dropdown/Dropdown';
import {
  userAPI,
  User,
} from '@/backoffice/components/dropdown/api/dropdownApi';

export const ModalFormView: React.FC<ModalFormViewProps> = ({
  isOpen,
  title,
  formData,
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
          <div className="space-y-2">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Code <label className="text-red-500">*</label>
              </label>
              <input
                type="text"
                placeholder="Input code"
                value={formData.code}
                onChange={(e) => handleInputChange('code', e.target.value)}
                required
                className="block w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Name <label className="text-red-500">*</label>
              </label>
              <input
                type="text"
                placeholder="Input name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                required
                className="block w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Description
              </label>
              <textarea
                placeholder="Input description"
                value={formData.description}
                onChange={(e) =>
                  handleInputChange('description', e.target.value)
                }
                className="block w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <Dropdown<User>
                onItemSelect={(userId) => handleInputChange('userId', userId)}
                getItems={userAPI.getUsers}
                itemToString={(user) => `${user.name} - ${user.email}`}
                label="Select User"
                placeholderText="Choose a user..."
                labelClassName="text-sm font-medium text-gray-900"
                inputClassName="w-full rounded-l-lg"
                dropdownClassName="w-full"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Active
              </label>
              <select
                value={formData.active}
                onChange={(e) => handleInputChange('active', e.target.value)}
                className="block w-full p-2 border border-gray-300 rounded-lg"
                required
              >
                <option value="0">Inactive</option>
                <option value="1">Active</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end space-x-2 mt-4 mb-4">
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
          </div>
        </Modal.Body>
      </form>
    </Modal>
  );
};
