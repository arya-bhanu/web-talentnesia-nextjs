import React from 'react';
import { ButtonImportProps } from './buttonImport.type';
import IconImport from '@/../public/icons/icons-import.svg';

export const ButtonImportView: React.FC<ButtonImportProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center focus:outline-none text-white bg-transparent border-2 border-[#FFC862] focus:ring-4 focus:ring-transparent font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 gap-1"
    >
      <IconImport />
      <span className="text-black">Import</span>
    </button>
  );
};
