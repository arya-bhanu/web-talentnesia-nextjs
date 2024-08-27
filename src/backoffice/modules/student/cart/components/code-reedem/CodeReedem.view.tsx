import React from 'react';

interface CodeReedemViewProps {
  code: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  className?: string;
  discountMessage?: string;
  onCancel: () => void;
}

const CodeReedemView: React.FC<CodeReedemViewProps> = ({
  code,
  onInputChange,
  onSubmit,
  className,
  discountMessage,
  onCancel
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
        <div className="flex items-center space-x-2">
          <p className="p-2 bg-green-100 text-green-800 rounded-md border border-green-200 ml-40 flex-shrink-0">
            {discountMessage}
          </p>
          <button
            type="button"
            onClick={onCancel}
            className="p-2 rounded-full hover:bg-gray-200 focus:outline-none"
          >
            <svg
              className="me-1.5 h-5 w-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L17.94 6M18 18L6.06 6"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default CodeReedemView;
