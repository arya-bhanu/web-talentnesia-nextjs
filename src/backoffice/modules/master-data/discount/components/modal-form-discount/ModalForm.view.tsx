import React from 'react';
import { Modal } from 'flowbite-react';
import { ModalFormViewProps } from './modalForm.type';
import { Component as Datepicker } from '@/backoffice/components/datepicker/Datepicker';
import { InputDropdown } from '@/backoffice/components/input-dropdown';
import { format, parseISO } from 'date-fns'; 

export const ModalFormView: React.FC<ModalFormViewProps> = ({
  isOpen,
  title,
  formData,
  hasError,
  handleInputChange,
  handleSave,
  onClose,
}) => {
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? 'Invalid Date' : format(date, 'MMM-dd-yyyy');
  };

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
              <label className="block mb-2 text-sm font-medium text-gray-900">Code</label>
              <input
                type="text"
                placeholder="Input code"
                value={formData.code || ''}
                onChange={(e) => handleInputChange('code', e.target.value)}
                required
                className="block w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>

            <div className="flex gap-4">
              <div className="w-1/2">
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Discount Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Input discount name"
                  value={formData.name || ''}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  required
                  className={`block w-full p-2 border ${
                    hasError && !formData.name ? 'border-red-500' : 'border-gray-300'
                  } rounded-lg`}
                />
                {hasError && !formData.name && (
                  <p className="text-red-500 text-xs mt-1">Discount name is required.</p>
                )}
              </div>
              <div className="w-1/2">
                <label className="block mb-2 text-sm font-medium text-gray-900">Percentage</label>
                <input
                  type="number"
                  placeholder="%"
                  value={formData.persentage || ''}
                  onChange={(e) => handleInputChange('persentage', e.target.value)}
                  className="block w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-1/2">
                <label className="block mb-2 text-sm font-medium text-gray-900">Start Date</label>
                <Datepicker
                  selectedDate={formatDate(formData.startDate)} // Format tanggal yang sudah diperbaiki
                  setSelectedDate={(date) => handleInputChange('startDate', date)}
                />
              </div>
              <div className="w-1/2">
                <label className="block mb-2 text-sm font-medium text-gray-900">End Date</label>
                <Datepicker
                  selectedDate={formatDate(formData.endDate)} // Format tanggal yang sudah diperbaiki
                  setSelectedDate={(date) => handleInputChange('endDate', date)}
                />
              </div>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Status<span className="text-red-500">*</span>
              </label>
              <InputDropdown
                value={Number(formData.active) === 1 ? 'Active' : 'Inactive'}
                onChange={(value) => handleInputChange('active', value)}
                options={['Active', 'Inactive']}
              />
              {hasError && !formData.active && (
                <p className="text-red-500 text-xs mt-1">Status is required.</p>
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
