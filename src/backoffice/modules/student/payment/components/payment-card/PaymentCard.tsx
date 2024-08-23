import React, { useState } from 'react';
import { PaymentCardProps } from '../../payment.type';

const PaymentCard: React.FC<PaymentCardProps> = ({
  title,
  status,
  price,
  downloadLink,
  discount,
  tax
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const formatCurrency = (amount: number) => {
    return `Rp ${amount.toLocaleString('id-ID')}`;
  };

  const getBadgeColor = (status: string) => {
    switch (status) {
      case 'success': return 'bg-green-100 text-[#10A760]';
      case 'process': return 'bg-yellow-100 text-[#F79009]';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex justify-between items-center">
        <div>
          <div className="flex items-center space-x-2">
            <h3 className="text-lg font-semibold">{title}</h3>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getBadgeColor(status)}`}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
          </div>
          <p className="text-gray-600">{formatCurrency(price)}</p>
        </div>
        <button
        onClick={() => window.open(downloadLink, '_blank')}
        className="flex items-center focus:outline-none text-white bg-[#FFC862] hover:bg-yellow-400 focus:ring-4 focus:ring-transparent font-medium rounded-[20px] text-sm px-5 py-2.5 me-2 mb-2"
      >
        <span className="text-[#667085]">Download E-Receipt</span>
      </button>
      </div>
      <div className="flex-grow border-t border-gray-300 border-dashed mt-5" />
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="mt-4 text-blue-600 flex items-center justify-end w-full"
      >
        {isOpen ? 'Fewer Details' : 'See Details'}
        <svg className={`ml-2 h-5 w-5 transform ${isOpen ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>
      {isOpen && (
        <div className="mt-4 text-[#667085]">
          <h4 className="font-bold text-lg">Payment Detail</h4>
          <div className="flex justify-between">
            <span className='mt-3'>{title}</span>
            <span className='mt-3'>{formatCurrency(price)}</span>
          </div>
          <div className="flex justify-between">
            <span className='mt-3'>Discount</span>
            <span className='mt-3'>{formatCurrency(discount)}</span>
          </div>
          <div className="flex justify-between">
            <span className='mt-3'>Tax</span>
            <span className='mt-3'>{formatCurrency(tax)}</span>
          </div>
          <div className="flex justify-between font-semibold">
            <span className='mt-3'>TOTAL</span>
            <span className='mt-3'>{formatCurrency(price - discount + tax)}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentCard;