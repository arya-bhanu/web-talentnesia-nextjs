import React, { useState } from 'react';
import { Modal } from 'flowbite-react';
import { FileInput } from '../input-file-type/InputFileType';
import Image from 'next/image';

export const ModalImport: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (file: File) => void;
}> = ({ isOpen, onClose, onSubmit }) => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    if (file) {
      onSubmit(file);
      onClose();
    }
  };

  return (
    <Modal show={isOpen} onClose={onClose}>
      <Modal.Header className="border-none items-center">
        <h1 className="text-xl font-semibold font-poppins">Import Student</h1>
      </Modal.Header>
      <Modal.Body>
        <div className="space-y-4">
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-900 font-lato">
              File xls<span className="text-red-600">*</span>
            </label>
            <div className="flex items-center w-full">
              <FileInput
                id="import-file"
                label="Upload file"
                accept=".xls,.xlsx"
                onReset={(resetFunc) => {
                  // You can use this to reset the file input if needed
                }}
              />
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="flex justify-end">
        <button
          onClick={onClose}
          className="px-4 py-3 text-sm font-medium text-[#F04438] bg-white border-2 border-[#F04438] rounded-lg hover:bg-red-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500"
        >
          Cancel
        </button>
        <button
          onClick={() => {
            // Handle import
          }}
          className="flex px-4 py-3 gap-2 text-sm font-medium text-[#323232] bg-white border-2 border-[#FFC862] rounded-lg hover:bg-green-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-green-500 "
        >
          <Image
            src="/icons/icon-google-spreadsheet.svg"
            width={20}
            height={20}
            alt="icons"
          />
          Download Template
        </button>
        <button
          onClick={handleSubmit}
          className="px-4 py-3 text-sm font-medium text-[#323232] bg-[#FFC862] rounded-lg hover:bg-[#FFC862] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#FFC862]"
        >
          Submit
        </button>
      </Modal.Footer>
    </Modal>
  );
};
