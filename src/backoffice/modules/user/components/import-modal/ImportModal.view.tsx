import React from 'react';
import { Modal } from 'flowbite-react';
import { Component as FileInput } from '../file-input/FileInput';
import Excel from '../../../../../../public/icons/manage-user/mdi_google-spreadsheet.svg'

interface ImportModalViewProps {
  onClose: () => void;
  onFileChange: (file: File | null) => void;
  onSubmit: () => void;
}

export const ImportModalView: React.FC<ImportModalViewProps> = ({
  onClose,
  onFileChange,
  onSubmit,
}) => {
  return (
    <Modal.Body className="w-full max-w-[670px] min-h-[276px] p-6 flex flex-col">
      <h1 className="text-2xl font-bold mb-4">Import Student</h1>
      <div className="mb-4 flex-grow">
        <label className="flex mb-1">
        File xls<div className="text-red-600">*</div>
        </label>
        <FileInput
          id="importFile"
          label="Upload XLS File"
          onChange={(file) => onFileChange(file)}
        />
      </div>
      <div className="flex justify-end space-x-2 mt-auto">
        <button
          onClick={onClose}
          className="px-4 py-2 text-sm font-medium bg-transparent border-[#F04438] text-[#F04438] border rounded-lg hover:bg-red-50"
        >
          Cancel
        </button>
        <button
          onClick={() => window.open('/path/to/template.xlsx', '_blank')}
          className="px-4 py-2 text-sm font-medium bg-transparent border-[#FFC862] text-[#323232] border rounded-lg hover:bg-red-50"
        >
            <div className='flex text-center text-base'><Excel />
            <div className='ml-3'>Download Template</div></div>
        </button>
        <button
          onClick={onSubmit}
          className="flex items-center focus:outline-none font-semibold text-[#323232] bg-[#FFC862] hover:bg-yellow-400 focus:ring-4 focus:ring-transparent rounded-lg text-sm px-5 py-2.5"
        >
          Submit
        </button>
      </div>
    </Modal.Body>
  );
};
