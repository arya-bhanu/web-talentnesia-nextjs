import React from 'react';
import { SearchTableView } from './SearchTable.view';
import { SearchTableProps } from './searchTable.type';

export const SearchTable: React.FC<SearchTableProps> = ({ value, onChange }) => {
  return (
    <SearchTableView value={value} onChange={onChange} />
  );
};
