import React from 'react';
import Image from 'next/image';
import { PaginationProps } from './pagination.type';

const PaginationView: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange, totalResults, itemsPerPage }) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const renderPageNumbers = () => {
    if (totalPages <= 5) {
      return pageNumbers;
    }

    const pages = [];
    if (currentPage > 2) {
      pages.push(1);
    }

    if (currentPage > 3) {
      pages.push('...');
    }

    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) {
      pages.push('...');
    }

    if (currentPage < totalPages - 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalResults);

  return (
    <div className="flex items-center justify-between cursor-pointer">
      <div className="flex items-center gap-1 text-xs font-medium ml-[20px]">
        <button
          className="inline-flex items-center justify-center rounded text-gray-900"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          <Image
            src="/icons/arrow-sm-left.svg"
            alt="Previous Page"
            width={24}
            height={24}
          />
        </button>
          {renderPageNumbers().map((number, index) =>
            number === '...' ? (
              <span key={index} className="text-gray-500 px-2">...</span>
            ) : (
              <button
                key={number}
                className={`inline-flex items-center justify-center rounded-full w-8 h-8 text-xs ${
                  number === currentPage
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-900 hover:bg-gray-100'
                }`}
                onClick={() => onPageChange(Number(number))}
              >
                {number}
              </button>
            )
          )}
        <button
          className="inline-flex items-center justify-center rounded bg-white text-gray-900"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          <span className="sr-only">Next Page</span>
          <Image
            src="/icons/arrow-sm-right.svg"
            alt="Next Page"
            width={24}
            height={24}
          />
        </button>
      </div>
      <div className="text-base cursor-pointer text-gray-800">
        <span>{totalResults} Hasil</span> 
      </div>
    </div>
  );
};

export default PaginationView;