import React from 'react';
import IconLeft from '../../../../public/icons/btn-left.svg';
import IconRight from '../../../../public/icons/btn-right.svg';

interface PaginationComponentProps {
  table: any;
  pageSize: number;
  setPageSize: (size: number) => void;
  dataLength: number;
}

const PaginationComponent: React.FC<PaginationComponentProps> = ({
  table,
  pageSize,
  setPageSize,
  dataLength,
}) => {
  return (
    <div className="flex justify-between items-center w-full mt-5">
      <div className="flex items-center gap-2 text-[#667085]">
        <label htmlFor="pagination" className="block">
          Showing
        </label>
        <select
          id="pagination"
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
            table.setPageIndex(0);
          }}
          className="bg-[#FFFFFF] border max-w-[5rem] border-gray-300 text-[#667085] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={30}>30</option>
          <option value={50}>50</option>
        </select>
        <p className="w-full min-w-max">
          data out of {dataLength}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <p className="text-[#667085]">Data per page</p>
        <div className="flex items-center gap-2">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <IconLeft />
          </button>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <IconRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaginationComponent;
