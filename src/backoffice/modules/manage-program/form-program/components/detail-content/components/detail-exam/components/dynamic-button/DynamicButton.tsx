import clsx from 'clsx';
import React from 'react';

interface ButtonProps {
  text: string;
  onClick?: () => void;
  className?: string;
}

const DynamicButton: React.FC<ButtonProps> = ({ text, onClick, className }) => {
  return (
    <button 
      className={clsx("bg-[#17a2b8] hover:bg-[#138496] text-white font-bold py-2.5 px-4 rounded-md", className)}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default DynamicButton;