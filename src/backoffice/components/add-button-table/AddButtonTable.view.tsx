import React from 'react';
import { AddButtonProps } from './addButtonTable.type';
import Add from '../../../../public/icons/add.svg';

export const AddButtonView: React.FC<AddButtonProps> = ({ onClick, text }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center focus:outline-none text-white bg-[#FFC862] hover:bg-yellow-400 focus:ring-4 focus:ring-transparent font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
    >
      <Add />
      <span className="text-black">{text}</span>
    </button>
  );
};
