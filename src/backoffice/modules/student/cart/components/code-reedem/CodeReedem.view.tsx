import React from 'react';

interface CodeReedemViewProps {
  code: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  className?: string;
  discountMessage?: string; 
}

const CodeReedemView: React.FC<CodeReedemViewProps> = ({
  code,
  onInputChange,
  onSubmit,
  className,
  discountMessage
}) => {
  return (
    <div className={`${className} flex items-center justify-between`}>
      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={code}
          onChange={onInputChange}
          placeholder="Kode Promo"
          className="p-2 border w-40 rounded-full border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="button"
          onClick={onSubmit}
          className="px-4 py-2 bg-[#E0F7FA] text-blue-500 rounded-full hover:bg-[#B2EBF2] focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Apply
        </button>
      </div>
      {discountMessage && (
        <p className="p-2 bg-green-100 text-green-800 rounded-md border border-green-200 ml-40 flex-shrink-0">
          {discountMessage}
        </p>
      )}
    </div>
  );
};

export default CodeReedemView;
