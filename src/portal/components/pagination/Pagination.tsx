import React from 'react';
import PaginationView from './Pagination.view';
import { PaginationProps } from './pagination.type';

const Pagination: React.FC<PaginationProps> = (props) => {
  return <PaginationView {...props} />;
};

export default Pagination;
