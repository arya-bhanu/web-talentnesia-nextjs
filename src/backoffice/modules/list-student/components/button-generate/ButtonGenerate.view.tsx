import React from 'react';
import { ButtonGenerateProps } from './buttonGenerate.type';
import LinkRegis from '@/../public/icons/manage-user/link.svg';

export const ButtonGenerateView: React.FC<ButtonGenerateProps> = ({ onClick }) => {
  return (
    <button
        onClick={onClick}
        className="flex items-center focus:outline-none bg-white border-[3px] border-[#FFC862] text-[#323232] hover:bg-orange-50 focus:ring-4 focus:ring-transparent font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
      >
        <LinkRegis/>
        <span className='ml-2'> Generate Link Register</span>
      </button>
  );
};
