'use client';

import React, { useState } from 'react';
import PaymentCard from '../payment/components/payment-card/PaymentCard';
import { PaymentViewProps } from './payment.type';
import { TabFlex } from '@/backoffice/components/tabs/tabs';
import IconLeft from '@/../public/icons/btn-left.svg';
import IconRight from '@/../public/icons/btn-right.svg';

const PaymentView: React.FC<PaymentViewProps> = ({ payments }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState('All');
  const [itemsPerPage, setItemsPerPage] = useState(3);

  const filteredPayments = payments.filter(payment => 
    activeTab === 'All' || 
    (activeTab === 'Active' && payment.status === 'process') ||
    (activeTab === 'Complete' && payment.status === 'success')
  );

  const pageCount = Math.ceil(filteredPayments.length / itemsPerPage);
  const currentPayments = filteredPayments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const tabs = [
    {
      title: "All",
      content: (
        <>
          <div className="space-y-4 mt-4">
            {currentPayments.map((payment, index) => (
              <PaymentCard key={index} {...payment} />
            ))}
          </div>
          <div className="flex justify-between items-center mt-4">
            <div className="flex items-center gap-2 text-[#667085]">
              <label htmlFor="pagination" className="block">
                Showing
              </label>
              <select
                id="pagination"
                value={itemsPerPage}
                onChange={(e) => {
                  setCurrentPage(1);
                  setItemsPerPage(Number(e.target.value));
                }}
                className="bg-[#FFFFFF] border max-w-[5rem] border-gray-300 text-[#667085] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
              >
                {[3, 10, 20, 30, 50].map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
              <p className="w-full min-w-max">
                data out of {filteredPayments.length}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <IconLeft />
              </button>
              <span className="text-sm text-[#667085]">
                Page {currentPage} of {pageCount}
              </span>
              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, pageCount))}
                disabled={currentPage === pageCount}
              >
                <IconRight />
              </button>
            </div>
          </div>
        </>
      ),
      active: activeTab === 'All'
    },
    {
      title: "Active",
      content: null,
      active: activeTab === 'Active'
    },
    {
      title: "Complete",
      content: null,
      active: activeTab === 'Complete'
    }
  ];

  return (
    <div className="p-4">
      <TabFlex tabs={tabs} />
    </div>
  );
};

export default PaymentView;
