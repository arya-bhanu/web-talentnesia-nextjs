'use client';

import React from 'react';
import TableExampleView from './TableExample.view';

const TableExample: React.FC = () => {
  const data: { id: number; name: string }[] = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
    { id: 3, name: 'Item 3' },
  ];

  return <TableExampleView data={data} />;
};

export default TableExample;
