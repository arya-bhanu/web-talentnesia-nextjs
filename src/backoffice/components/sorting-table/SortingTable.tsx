import React from 'react';
import { Column } from '@tanstack/react-table';
import SortArrow from '../../../../public/icons/sort-arrow.svg';
import SortArrowUp from '../../../../public/icons/sort-arrow-up.svg';

interface SortingTableProps<T> {
  column: Column<T, unknown>;
  title: string;
}

function SortingTable<T>({ column, title }: SortingTableProps<T>) {
  return (
    <div className="flex items-center">
      <p>{title}</p>
      {!column.getIsSorted() ? (
        <SortArrow
          className="ml-2 cursor-pointer"
          onClick={() => column.toggleSorting()}
        />
      ) : (
        <SortArrowUp
          className={`ml-2 cursor-pointer ${
            column.getIsSorted() === 'desc' ? 'rotate-180' : ''
          }`}
          onClick={() => column.toggleSorting()}
        />
      )}
    </div>
  );
}

export default SortingTable;
